window.DetailView = Backbone.View.extend({

  el: $('#openbudget')[0],

  initialize: function(){
    this.router = this.options.router;
    this.case_id = this.options.case_id;
    Cases.bind('reset', this.render, this);
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

    $(document).scrollTop(0);

    return this;
  },

  showIndex: function(evt){
    evt.preventDefault();

    this.router.navigate('', true)
  }
});
