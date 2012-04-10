var CaseStudy = Backbone.Model.extend({
  toJSON: function(){
    var country_name = Countries.getByCartoDBId(this.get('country_id')).get('name');
    return _.extend(this.attributes, {
      classification: this.get('category_id') + this.get('sector') + this.get('tags'),
      resources: this.get('resources_media') + this.get('resources_document') + this.get('resources_links'),
      country: country_name,
      category: Categories.getByCartoDBId(this.get('category_id')).get('name'),
      country_iso: Countries.getByCartoDBId(this.get('country_id')).get('iso'),
      subtitle_country: country_name && this.get('subtitle')
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
