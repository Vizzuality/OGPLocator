var CaseStudies = CartoDB.CartoDBCollection.extend({
  valid_filters: {
    'country'   : 'country_id',
    'sector'    : 'sector',
    'category'  : 'country_id',
    'challenge' : 'ogp_grandchallenges_id'
  },

  table: 'case_studies',

  columns: {
    "cartodb_id"             : "cartodb_id",
    "the_geom"               : "the_geom",
    "background"             : "background",
    "category_id"            : "category_id",
    "contact_information"    : "contact_information",
    "country_id"             : "country_id",
    "critical_issues"        : "critical_issues",
    "implementation"         : "implementation",
    "implementing_partners"  : "implementing_partners",
    "ogp_grandchallenges_id" : "ogp_grandchallenges_id",
    "overview"               : "overview",
    "relevant_networks"      : "relevant_networks",
    "resources_document"     : "resources_document",
    "resources_links"        : "resources_links",
    "resources_media"        : "resources_media",
    "subtitle"               : "subtitle",
    "tags"                   : "tags",
    "title"                  : "title",
    "video"                  : "video",
    "website"                : "website"
  },

  getByCartoDBId: function(id){
    return _.find(this.models, function(model){
      return model.get('cartodb_id') == id;
    });
  },

  filterBy: function(filter, id, callback){
    filter = this.valid_filters[filter];
    if (filter){
      this.where_ = filter + " = " + id;
    }
    this.fetch();
  }
});
