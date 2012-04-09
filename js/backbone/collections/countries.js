var CountriesCollection = CartoDB.CartoDBCollection.extend({
  sql: function(){
    return ' \
      SELECT c.cartodb_id, c.admin as name \
      FROM ogp_countries c \
      INNER JOIN case_studies cs ON cs.country_id = c.cartodb_id';
  }
});
