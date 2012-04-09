window.DetailView = Backbone.View.extend({

  el: $('#openbudget')[0],

  initialize: function(){
    this.router = this.options.router;
    this.case_id = this.options.case_id;
    Cases.bind('reset', this.reloadCase, this);
  },

  events: {
    'click #back': 'showIndex'
  },

  render: function(){
    Case = Cases.getByCartoDBId(this.case_id);

    if (Case == null){
      Cases.fetch();
      return;
    }

    this.template = ich.detail(Case.toJSON());

    this.$el.html(this.template);

    this.initMap();

    $(document).scrollTop(0);

    return this;
  },

  showIndex: function(evt){
    evt.preventDefault();

    this.router.navigate('', true)
  },

  reloadCase: function(){
    Case = Cases.getByCartoDBId(this.case_id);
    this.template = ich.detail(Case.toJSON());
    this.render();
  },

  initMap: function(){
    if (!this.map){
      this.map = new google.maps.Map(this.$el.find('#mini_map')[0], mini_map_options);
    }

    setPolygon(this.map, Case.getPolygon());
  }
});
