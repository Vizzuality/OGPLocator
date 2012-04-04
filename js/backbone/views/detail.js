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
  }
});
