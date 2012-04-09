window.DetailView = Backbone.View.extend({

  el: $('#openbudget')[0],

  initialize: function(){
    this.router = this.options.router;
    this.case_id = this.options.case_id;
    Cases.bind('reset', this.reloadCase, this);

    Case = Cases.getByCartoDBId(this.case_id);
    if (Case == null){
      Cases.fetch();
      return;
    }
    this.template = ich.detail(Case.toJSON());
  },

  events: {
    'click #back': 'showIndex'
  },

  render: function(){
    this.$el.html(this.template);

    this.initMap();

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
      map = new google.maps.Map(this.$el.find('#mini_map')[0]);
    }
    var the_geom = Case.get('the_geom');
    if (the_geom && the_geom.coordinates){
      mini_map_options['center'] = new google.maps.LatLng(the_geom.coordinates[1], the_geom.coordinates[0]);
    }
    map.setOptions(mini_map_options);

    setPolygon(Case.getPolygon());
  }
});
