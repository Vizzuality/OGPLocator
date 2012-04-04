var CartoDB = Backbone.CartoDB({
  user: 'ogp'
});

var CaseStudies = CartoDB.CartoDBCollection.extend({
  table: 'case_studies',
  columns: {
    "cartodb_id":            "cartodb_id",
    "the_geom":              "the_geom",
    "background":            "background",
    "category":              "category",
    "contact_information":   "contact_information",
    "country":               "country",
    "critical_issues":       "critical_issues",
    "implementation":        "implementation",
    "implementing_partners": "implementing_partners",
    "ogp_grand_challenges":  "ogp_grand_challenges",
    "overview":              "overview",
    "relevant_networks":     "relevant_networks",
    "resources_document":    "resources_document",
    "resources_links":       "resources_links",
    "resources_media":       "resources_media",
    "sector":                "sector",
    "subtitle":              "subtitle",
    "tags":                  "tags",
    "title":                 "title",
    "video":                 "video",
    "website":               "website"
  },

  getByCartoDBId: function(id){
    return _.find(this.models, function(model){
      return model.get('cartodb_id') == id;
    });
  }
});
