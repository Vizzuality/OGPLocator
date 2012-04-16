var CountriesCollection = CartoDB.CartoDBCollection.extend({
  sql: function(){
    return ' \
      SELECT c.cartodb_id, c.admin as name, c.iso_a2 as iso, ST_AsGeoJSON(ST_Centroid(c.the_geom)) as latlon \
      FROM ogp_countries c \
      INNER JOIN case_studies cs ON cs.country_id = c.cartodb_id \
			ORDER BY name';
  },

  getByCartoDBId: function(id){
    return _.find(this.models, function(model){
      return model.get('cartodb_id') == id;
    });
  }
});
