var MainRouter = Backbone.Router.extend({

  initialize: function(){
    var root = '';
    if (window.location.href.indexOf('OGPLocator') > 0){
      root = '/OGPLocator/';
    }
    Backbone.history.start({pushState: true, root: root});
  },

  routes: {
    '':           'index',
    'detail/:id': 'detail'
  },

  index: function(){
    if (!this.indexView){
      this.indexView = new IndexView({
        router: this
      });
    }
  },

  detail: function(id){

  }

});
