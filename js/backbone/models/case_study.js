var CaseStudy = Backbone.Model.extend({
  toJSON: function(){
    var country_name = Countries.getByCartoDBId(this.get('country_id')).get('name');
    var topic_name = Topics.getByCartoDBId(this.get('topic_id')).get('name');

    return _.extend(this.attributes, {
      classification: country_name || topic_name,
      resources: this.get('resources_media') || this.get('resources_document') || this.get('resources_links'),
      country: country_name,
      topic: topic_name,
      category: Categories.getByCartoDBId(this.get('category_id')).get('name'),
      country_iso: Countries.getByCartoDBId(this.get('country_id')).get('iso'),
      subtitle_country: country_name && this.get('subtitle'),
      contact: this.get('contact_information') || this.get('website')
    });
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
  }
});
