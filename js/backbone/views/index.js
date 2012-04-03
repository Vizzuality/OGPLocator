window.IndexView = Backbone.View.extend({

  initialize: function(){
    this.router = this.options.router;
    this.template = ich.index({});
  },

  render: function(){
    $(this.el).html(this.template);
    $('#openbudget').append(this.$el);
  }

});
