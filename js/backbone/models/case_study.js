var CaseStudy = Backbone.Model.extend({
  toJSON: function(){
    return _.extend(this.attributes, {
      classification: this.get('category_id') + this.get('sector') + this.get('tags'),
      resources: this.get('resources_media') + this.get('resources_document') + this.get('resources_links'),
      country: Countries.getByCartoDBId(this.get('country_id')).get('name'),
      category: Categories.getByCartoDBId(this.get('category_id')).get('name'),
      country_iso: Countries.getByCartoDBId(this.get('country_id')).get('iso')
    });
  },

  getLatLong: function(){
    return $.parseJSON(Countries.getByCartoDBId(this.get('country_id')).get('latlon'));
  }
});
