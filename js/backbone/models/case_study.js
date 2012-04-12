var CaseStudy = Backbone.Model.extend({
  html_fields: ['overview',
            'background',
            'implementation',
            'critical_issues',
            'contact_information',
            'website',
            'resources_document',
            'resources_links',
            'resources_media',
            'relevant_networks',
            'implementing_partners'],

  toJSON: function(){
    var country_name = Countries.getByCartoDBId(this.get('country_id')).get('name');
    var topic_name = Topics.getByCartoDBId(this.get('topic_id')).get('name');

    var json_object = _.extend(this.attributes, {
      short_overview: this._truncate(this.get('overview'), 165),
      classification: country_name || topic_name,
      resources: this.get('resources_media') || this.get('resources_document') || this.get('resources_links'),
      country: country_name,
      topic: topic_name,
      category: Categories.getByCartoDBId(this.get('category_id')).get('name'),
      country_iso: Countries.getByCartoDBId(this.get('country_id')).get('iso'),
      subtitle_country: country_name && this.get('subtitle'),
      contact: this.get('contact_information') || this.get('website'),
      video_player_url: this.youtube_player_url()
    });

    _.each(this.html_fields, function(key){
      var field = json_object[key];
      if (field){
        field = field.replace(uri_regexp, function(match){
          if (match.match(mail_regexp)) {
            return escape('<a href="mailto:' + unescape(match) + '">' + unescape(match) + '</a>');
          }

          var url = $.url(match);
          return escape('<a href="' + unescape(match) + '">' + unescape(url.attr('host')) + '</a>');
        });

        json_object[key + '_html'] = unescape(ich.paragraph({paragraphs: field.split('\n')}).html());
      }
    });

    return json_object;
  },

  youtube_player_url: function(){
    if (!this.get('video')){
      return null;
    }
    return 'http://www.youtube.com/embed/' + $.url(this.get('video')).param('v');
  },

  getLatLong: function(){
    return $.parseJSON(Countries.getByCartoDBId(this.get('country_id')).get('latlon'));
  },

  getRelated: function(callback){
    var self = this;
    var related = new CaseStudies();

    related.fetch({success: function(){

      related.filterBy('category', self.get('category_id'), function(cases){

        callback.call(this, _.first(_.filter(cases, function(_case){
          return _case.get('cartodb_id') != self.get('cartodb_id')
        }), 3));

      });

    }})
  },

  _truncate: function (string, limit) {
    if (string.length > limit) {
      var string_truncated = string.substring(0, limit);
      string_truncated = string_truncated.replace(/w+$/, '');

      string_truncated += '<a href="#" \
        onclick="this.parentNode.innerHTML= \
        unescape(\''+string+'\');return false;">...</a>';
      return string_truncated;
    }
    return string;
  }

});
