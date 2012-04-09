var CategoriesCollection = CartoDB.CartoDBCollection.extend({
  sql: function(){
    return ' \
      SELECT DISTINCT c.cartodb_id, c.label as name\
      FROM ogp_categories c \
      INNER JOIN case_studies cs ON cs.category_id = c.cartodb_id';
  }
});
