window.DetailView = Backbone.View.extend({

  el: $('#openbudget')[0],

  initialize: function(){
    this.router = this.options.router;
    this.case_id = this.options.case_id;
    Cases.bind('reset', this.render, this);
  },

  events: {
    'click #back'                      : 'showIndex',
    'click div#experiencies ul li h3 a': 'showDetail'
  },

  render: function(){
    Case = Cases.getByCartoDBId(this.case_id);

    if (Case == null){
      Cases.fetch();
      return;
    }

    this.template = ich.detail(Case.toJSON());

    this.$el.html(this.template);

    this._showRelated();

    $(document).scrollTop(0);

    return this;
  },

  showIndex: function(evt){
    evt.preventDefault();

    this.router.navigate('', true)
  },

  showDetail: function(evt){
    evt.preventDefault();
    this.router.navigate($(evt.target).attr('href'), true);
  },

  _showRelated: function(){
    var self = this;
    Case.getRelated(function(cases){
      self.$el.find('#experiencies ul').empty();
      _.each(cases, function(case_study){
        self.$el.find('#experiencies ul').append(ich.detail_related_item(case_study.toJSON()));
      });
    })
  }
});
