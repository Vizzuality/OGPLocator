var TopicsCollection = CartoDB.CartoDBCollection.extend({
  sql: function(){
    return ' \
      SELECT DISTINCT t.cartodb_id, t.name \
      FROM ogp_topics t';
  },

  getByCartoDBId: function(id){
    return _.find(this.models, function(model){
      return model.get('cartodb_id') == id;
    });
  }
});
