var MainRouter = Backbone.Router.extend({

  initialize: function(){
    Backbone.history.start({pushState: true});
  },

  routes: {
    '':           'index',
    'detail/:id': 'detail'
  },

  index: function(){
    if (!this.indexView){
      this.indexView = new IndexView({router: this});
      this.indexView.render();
    }
  },

  detail: function(id){

  }

});
