window.IndexView = Backbone.View.extend({

  initialize: function(){
    this.router = this.options.router;
    Cases.bind('reset', this.render, this);
    Cases.fetch();
  },

  render: function(){
    var that = this;

    $(this.el).html(ich.index({number_of_cases: Cases.length}));

    _.each(Cases.models, function(case_study){
      that.$el.find('#results .search ul').append(ich.index_list_item(case_study.toJSON()));
    })

    $('#openbudget').append(this.$el);
  }

});
