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

    var detail_json = Case.toJSON();
    _.each(['overview',
            'background',
            'implementation',
            'critical_issues',
            'contact_information',
            'resources_document',
            'resources_links',
            'resources_media',
            'relevant_networks',
            'implementing_partners'], function(key){
      !detail_json[key] || (detail_json[key + '_html'] = ich.paragraph({paragraphs: detail_json[key].split('\n')}).html());
    });
    console.log(detail_json)
    this.template = ich.detail(detail_json);

    this.$el.html(this.template);

    this._showRelated();

    $(document).scrollTop(0);

    return this;
  },

  showIndex: function(evt){
    evt.preventDefault();
    this.router.last_index();
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
