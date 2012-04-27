window.IndexView = Backbone.View.extend({

  el: $('#openbudget')[0],

  markers: [],

  events: {
    'click div#openbudget div#results div.search ul li a':    'showDetail',
    'click div#map h3 a':                                     'showDetail',
    'click div#openbudget header li.menu a.filter':           'toggleFilter',
    'click div#openbudget header li.menu':                    'stopPropagation',
    'click div#openbudget header div.filters ul li a':        'navigateToFilter',
    'keyup div#results div.search form input.search_box':     'filterByText',
    'submit form':                                            'disableForms',
    'click div#results div.summary .clear a':                 'reloadIndex'
  },

  initialize: function(){
    this.router = this.options.router;

    Cases.bind('reset', this.render, this);
    $(document).click(this._hideFilters);

    this.template = ich.index();
  },

  render: function(){
    document.title = 'Experience Locator';

    this.$el.html(this.template);

    this._renderFiltersLists();

    if (this.currentTextFilter){
      this._focusSearchForm();
    }else{
      this._renderList();
    }

    return this;
  },

  _renderList: function(cases){
    this._initMap();
    this._cleanMarkers();
    this.$el.find('#results .search ul').empty();

    this._updateSummary((cases || Cases.models).length);

    var ordered_cases = _.sortBy((cases || Cases.models), function(model){
      return model.get('title');
    });

    _.each(ordered_cases, function(case_study){
      this.markers.push(addMarker(this.map, case_study));
      this.$el.find('#results .search ul').append(ich.index_list_item(case_study.toJSON()));
    }, this);

    setMapPolygons(this.map, cases || Cases.models);
  },

  _initMap: function(){
    if (!this.map){
      this.map = new L.Map('map',{minZoom:1,center:new L.LatLng(16.26312408340919, -10.0),zoom:2});

      this.map.addLayer(new L.CartoDBLayer({
        map_canvas:     'map',
        map:            this.map,
        user_name:      'ogp',
        table_name:     'ogp_countries',
        tile_style:     "#ogp_countries {polygon-fill:#D0EAF5; polygon-opacity: 1; line-opacity:0; line-color: rgba(0, 0, 0, 0);}",
        infowindow:     false,
        query:          'SELECT * FROM {{table_name}}',
        auto_bound:     false,
        debug:          false
      }));
    }
  },

  _cleanMarkers: function(){
    _.each(this.markers, function(marker){
      this.map.removeLayer(marker);
    }, this);
    this.markers = [];
  },

  _renderFiltersLists: function(){
    this.$el.find('.filters ul').empty();

    var countries_list = $('.filters.countries ul');
    _.each(Countries.models, function(country){
      countries_list.append(ich.filter_list_item({url: 'country/' + country.get('cartodb_id'), name: country.get('name'), type: 'country', cartodb_id: country.get('cartodb_id')}));
    });

    var topics_list = $('.filters.topics ul');
    _.each(Topics.models, function(topic){
      topics_list.append(ich.filter_list_item({url: 'topic/' + topic.get('cartodb_id'), name: topic.get('name'), type: 'topic', cartodb_id: topic.get('cartodb_id')}));
    });

    var categories_list = $('.filters.categories ul');
    _.each(Categories.models, function(category){
      categories_list.append(ich.filter_list_item({url: 'category/' + category.get('cartodb_id'), name: category.get('name'), type: 'category', cartodb_id: category.get('cartodb_id')}));
    });

    var challenges_list = $('.filters.challenges ul');
    _.each(Challenges.models, function(challenge){
      challenges_list.append(ich.filter_list_item({url: 'challenge/' + challenge.get('cartodb_id'), name: challenge.get('name'), type: 'challenge', cartodb_id: challenge.get('cartodb_id')}));
    });
  },

  showDetail: function(evt){
    evt.preventDefault();
    this.router.navigate($(evt.target).attr('href'), true);
  },

  navigateToFilter: function(evt){
    evt.preventDefault();
    var link = $(evt.currentTarget);
    link.closest('div.filters').removeClass('show');
    this.router.navigate(link.attr('href'), true);
  },

  filterBy: function(filter, id){
    var self = this;

    this.currentFilter = this.$el.find(".filters a." + filter + "_" + id).text();
    Cases.filterBy(filter, id, function(cases){
      if (self.currentTextFilter){
        self._focusSearchForm();
      }else{
        self._renderList(cases);
      }
    });

    return this;
  },

  filterByText: function(evt){
    if (evt && evt.keyCode == 13){
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    }

    var self = this;
    this.currentTextFilter = this.$el.find('div#results div.search form input.search_box').val();

    Cases.textFilter(this.currentTextFilter, function(cases){
      self._renderList(cases);
    });
  },

  disableForms: function(evt){
    evt.preventDefault();
    evt.stopPropagation();
    return false;
  },

  reloadIndex: function(evt){
    evt.preventDefault();
    this.$el.find('div#results div.search form input.search_box').val('');
    this.currentTextFilter = null;
    this.currentFilter = null;
    this.router.navigate('');
    this.router.index();
  },

  toggleFilter: function(evt){
    evt.preventDefault();
    evt.stopPropagation();
    var link = this.$(evt.currentTarget);
    this.currentFilter = link.text();
    var filters_div = link.next('div.filters');

    this.$('div.filters').not(filters_div).removeClass('show');

    if (filters_div.hasClass('show')){
      filters_div.removeClass('show');
    }else{
      filters_div.addClass('show');
    }
  },

  _hideFilters: function(evt){
    $('div.filters').removeClass('show');
  },

  stopPropagation: function(evt){
    evt.stopPropagation();
  },

  _focusSearchForm: function(){
    this.$el.find('div#results div.search form input.search_box').val(this.currentTextFilter).focus();
    this.filterByText();
  },

  _updateSummary: function(cases_number){
    var text = [this.currentFilter, this.currentTextFilter].join('');

    this.$el.find('.summary').html(ich.index_summary({number_of_cases: cases_number}));

    if (!text || $.trim(text) === ''){
      this.$el.find('div#results div.search div.summary span.in').empty().removeClass('show');
      this.$el.find('div#results div.search div.summary span.for').empty().removeClass('show');
      this.$el.find('div#results div.search div.summary .clear').removeClass('show');
    }else{
      if (this.currentFilter) {
        this.$el.find('div#results div.search div.summary span.in').html(' in ' + this.currentFilter).addClass('show');
      }
      if (this.currentTextFilter) {
        this.$el.find('div#results div.search div.summary span.for').html(' for ' + this.currentTextFilter).addClass('show');
      }
      this.$el.find('div#results div.search div.summary .clear').addClass('show');
    }
  }


});
