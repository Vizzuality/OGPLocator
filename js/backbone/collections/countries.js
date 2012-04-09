var CountriesCollection = CartoDB.CartoDBCollection.extend({
  table: 'ogp_countries',

  columns: {
    "cartodb_id" : "cartodb_id",
    "the_geom"   : "the_geom",
    "name"       : "admin"
  }
});
