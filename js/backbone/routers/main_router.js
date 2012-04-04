var MainRouter = Backbone.Router.extend({

  initialize: function(){
    Backbone.history.start({pushState: true, root: '/OGPLocator/'});
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
    if (!this.detailView){
      this.detailView = new DetailView({
        router: this,
        case_id: id
      });
      this.detailView.render();
    }
  }

});
