var CaseStudy = Backbone.Model.extend({
  toJSON: function(){
    return _.extend(this.attributes, {
      country: Countries.getByCartoDBId(this.get('country_id')).get('name')
    });
  }
});
