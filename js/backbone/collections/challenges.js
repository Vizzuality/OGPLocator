var ChallengesCollection = CartoDB.CartoDBCollection.extend({
  sql: function(){
    return ' \
      SELECT DISTINCT g.cartodb_id, g.name \
      FROM ogp_grandchallenges g \
      INNER JOIN case_studies cs ON cs.ogp_grandchallenges_id = g.cartodb_id';
  }
});
