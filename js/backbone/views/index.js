window.IndexView = Backbone.View.extend({

  el: $('#openbudget')[0],

  events: {
    'click .search ul li a':                        'showDetail',
    'click div#openbudget header li.menu a.filter': 'toggleFilter',
    'click div#openbudget header li.menu':          'stopPropagation'
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

    this.initMap();

    return this;
  },

  showDetail: function(evt){
    evt.preventDefault();
    this.router.navigate($(evt.target).attr('href'), true);
  },

  initMap: function(){
    if (!this.map){
      map = new google.maps.Map(this.$el.find('#map')[0], map_options);
    }
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
