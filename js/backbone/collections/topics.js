var TopicsCollection = CartoDB.CartoDBCollection.extend({
  sql: function(){
    return ' \
      SELECT DISTINCT t.cartodb_id, t.name \
      FROM ogp_topics t \
      INNER JOIN case_studies cs ON cs.topic_id = t.cartodb_id';
  }
});
