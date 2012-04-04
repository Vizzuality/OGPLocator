window.IndexView = Backbone.View.extend({

  el: $('#openbudget')[0],

  events: {
    'click .search ul li a': 'showDetail'
  },

  initialize: function(){
    this.router = this.options.router;
    Cases.bind('reset', this.render, this);
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
  }

});
