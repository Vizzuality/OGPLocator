var MainRouter = Backbone.Router.extend({

  initialize: function(){
    Backbone.history.start({pushState: true, root: '/OGPLocator/'});
  },

  routes: {
    '':                         'index',
    'detail/:id':               'detail',
    ':filter/:challenge_id':    'filter'
  },

  index: function(){
    this.index_view().render();
  },

  detail: function(id){
    this.detail_view(id).render();
  },

  filter: function(filter, id){
    this.index_view().filterBy(filter, id);
  },

  index_view: function(){
    if (!this.indexView){
      this.indexView = new IndexView({
        router: this
      });
    }
    return this.indexView;
  },

  detail_view: function(id){
    if (!this.detailView){
      this.detailView = new DetailView({
        router: this,
        case_id: id
      });
    }
    return this.detailView;
  }

});
