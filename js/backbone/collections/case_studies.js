var CaseStudies = CartoDB.CartoDBCollection.extend({
  valid_filters: {
    'country'   : 'country_id',
    'topic'     : 'topic_id',
    'category'  : 'category_id',
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
    "title"                  : "title",
    "video"                  : "video",
    "website"                : "website"
  },

  model: CaseStudy,

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
  },

  textFilter: function(text){
    if (_.isNull(text) || text === ''){
      this.fetch();
    }

    this.models = _.filter(this.models, function(model){
      return _.find(_.values(model.attributes), function(model_value){
        return !_.isNull(model_value) && (model_value).toString().toLowerCase().indexOf(text) > 0;
      });
    });
    this.reset(this.models);
  }

});
