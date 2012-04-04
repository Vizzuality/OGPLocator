window.DetailView = Backbone.View.extend({

  initialize: function(){
    this.router = this.options.router;
    this.case_id = this.options.case_id;
    Cases.bind('reset', this.render, this);
    if (Case == null){
      Cases.fetch();
    }
  },

  events: {
  },

  render: function(){
    Case = Cases.getByCartoDBId(this.case_id);
    if (Case == null) { return; }

    var that = this;

    console.log(Case.toJSON());
    $(this.el).html(ich.detail(Case.toJSON()));

    $('#openbudget').html(this.$el);
  },

  showDetail: function(evt){
    evt.preventDefault();

    this.router.navigate('detail/' + $(this).attr('rel'))
  }

});
