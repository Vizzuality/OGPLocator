var ChallengesCollection = CartoDB.CartoDBCollection.extend({
  sql: function(){
    return ' \
      SELECT DISTINCT g.cartodb_id, g.name \
      FROM ogp_grandchallenges g \
			ORDER BY g.name';
  }
});
