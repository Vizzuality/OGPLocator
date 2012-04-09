window.IndexView = Backbone.View.extend({

  el: $('#openbudget')[0],

  events: {
    'click .search ul li a':                           'showDetail',
    'click .infowindow h3 a':                          'showDetail',
    'click div#openbudget header li.menu a.filter':    'toggleFilter',
    'click div#openbudget header li.menu':             'stopPropagation',
    'click div#openbudget header div.filters ul li a': 'navigateToFilter'
  },

  initialize: function(){
    this.router = this.options.router;
    Cases.bind('reset', this.render, this);
    $(document).click(this.hideFilters);
  },

  render: function(){
    this.template = ich.index({number_of_cases: Cases.length});

    _.each(Cases.models, function(case_study){
      $(this.template).find('#results .search ul').append(ich.index_list_item(case_study.toJSON()));
    }, this);

    this.$el.html(this.template);

    this._renderFiltersLists();

    this.initMap();

    return this;
  },

  initMap: function(){
    if (!this.map){
      
      var mapChartLayer = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var lULP = new google.maps.Point(coord.x*256,(coord.y+1)*256);
          var lLRP = new google.maps.Point((coord.x+1)*256,coord.y*256);     
          var projectionMap = new MercatorProjection();
          var lULg = projectionMap.fromDivPixelToLatLng(lULP, zoom);
          var lLRg = projectionMap.fromDivPixelToLatLng(lLRP, zoom);         
          var countries = "SV|CD|GT|HN|MD|ML|ZM";
          var data ="1,1,1,1,1,1,1";
          var limits = "0,1";
          var selected_color = "";


                   var baseUrl="http://chart.apis.google.com/chart?chs=256x256&chd=t:"+data+"&chco=D0EAF5,FFFFB2,FFFFFF&chld="+countries+"&chf=a,s,B6DDEE|bg,s,00000000&chds="+limits;

          var bbox="&cht=map:fixed=" + lULg.lat() +","+ lULg.lng() + "," + lLRg.lat() + "," + lLRg.lng();
          return baseUrl+bbox;
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: true,
        maxZoom: 18,
        name: "GMC",
        alt: "Google Map Chart"
      });
      
      this.map = new google.maps.Map(this.$el.find('#map')[0], map_options);
      this.map.mapTypes.set('gmc', mapChartLayer);
      this.map.setMapTypeId('gmc');

      var customZoomControl = new CustomZoomControl(this.map);
      customZoomControl.index = 1;
      this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(customZoomControl);

      infoWindow = new InfoWindow({
        map: this.map
      });

      _.each(Cases.models, function(case_study){
        addMarker(this.map, case_study);
      }, this);
    }
  },


  _renderFiltersLists: function(){
    var countries_list = $('.filters.countries ul');
    _.each(Countries.models, function(country){
      countries_list.append(ich.filter_list_item({url: 'country/' + country.get('cartodb_id'), name: country.get('name')}));
    });

    var topics_list = $('.filters.topics ul');
    _.each(Topics.models, function(topic){
      topics_list.append(ich.filter_list_item({url: 'topic/' + topic.get('cartodb_id'), name: topic.get('name')}));
    });

    var categories_list = $('.filters.categories ul');
    _.each(Categories.models, function(category){
      categories_list.append(ich.filter_list_item({url: 'category/' + category.get('cartodb_id'), name: category.get('name')}));
    });

    var challenges_list = $('.filters.challenges ul');
    _.each(Challenges.models, function(challenge){
      challenges_list.append(ich.filter_list_item({url: 'challenge/' + challenge.get('cartodb_id'), name: challenge.get('name')}));
    });
  },

  navigateToFilter: function(evt){
    evt.preventDefault();
    this.router.navigate($(evt.currentTarget).attr('href'), true);
  },

  filterBy: function(filter, id){
    Cases.filterBy(filter, id);
  },

  showDetail: function(evt){
    console.log(evt);
    evt.preventDefault();
    this.router.navigate($(evt.target).attr('href'), true);
  },

  toggleFilter: function(evt){
    evt.preventDefault();
    evt.stopPropagation();
    var filters_div = this.$(evt.currentTarget).next('div.filters');

    this.$('div.filters').not(filters_div).removeClass('show');

    if (filters_div.hasClass('show')){
      filters_div.removeClass('show');
    }else{
      filters_div.addClass('show');
    }
  },

  hideFilters: function(evt){
    $('div.filters').removeClass('show');
  },

  stopPropagation: function(evt){
    evt.stopPropagation();
  }


});
