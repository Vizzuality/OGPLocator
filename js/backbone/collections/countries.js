var CountriesCollection = CartoDB.CartoDBCollection.extend({
  sql: function(){
    return ' \
      SELECT c.cartodb_id, c.admin as name \
      FROM ogp_countries c \
      INNER JOIN case_studies cs ON cs.country_id = c.cartodb_id';
  }
});

var CountriesWithGeomCollection = CartoDB.CartoDBCollection.extend({
  sql: function(){
    return ' \
      SELECT c.cartodb_id, c.admin as name, ST_AsGeoJSON(ST_Centroid(c.the_geom)) as latlon, ST_AsGeoJSON(c.the_geom) as the_geom \
      FROM ogp_countries c';
  },

  getByCartoDBId: function(id){
    return _.find(this.models, function(model){
      return model.get('cartodb_id') == id;
    });
  }

});
