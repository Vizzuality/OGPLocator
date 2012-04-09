window.IndexView = Backbone.View.extend({

  el: $('#openbudget')[0],

  events: {
    'click .search ul li a':                           'showDetail',
    'click div#openbudget header li.menu a.filter':    'toggleFilter',
    'click div#openbudget header li.menu':             'stopPropagation',
    'click div#openbudget header div.filters ul li a': 'navigateToFilter'
  },

  initialize: function(){
    this.router = this.options.router;
    Cases.bind('reset', this.render, this);
    $(document).click(this.hideFilters);
  },

  initMap: function(){
    if (!this.map){
      map = new google.maps.Map(this.$el.find('#map')[0], map_options);

      var customZoomControl = new CustomZoomControl(map);
      customZoomControl.index = 1;
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(customZoomControl);
    }
  },

  render: function(){
    this.template = ich.index({number_of_cases: Cases.length});

    _.each(Cases.models, function(case_study){
      $(this.template).find('#results .search ul').append(ich.index_list_item(case_study.toJSON()));
    }, this);

    this.$el.html(this.template);

    this.initMap();

    return this;
  },

  navigateToFilter: function(evt){
    evt.preventDefault();
    this.router.navigate($(evt.currentTarget).attr('href'), true);
  },

  filterBy: function(filter, id){
    Cases.filterBy(filter, id);
  },

  showDetail: function(evt){
    evt.preventDefault();
    this.router.navigate($(evt.target).attr('href'), true);
  },

  toggleFilter: function(evt){
    evt.preventDefault();
    evt.stopPropagation();
    var filters_div = this.$(evt.target).next('div.filters');
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
