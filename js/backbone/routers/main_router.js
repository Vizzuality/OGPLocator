var MainRouter = Backbone.Router.extend({

  last_visited_index: null,

  initialize: function(){
    Backbone.history.start({pushState: false, root: '/OGPLocator/'});
  },

  routes: {
    '':                         'index',
    '!detail/:id':              'detail',
    ':filter/:challenge_id':    'filter'
  },

  index: function(){
    this.last_visited_index = '';
    this.index_view().render();
  },

  filter: function(filter, id){
    this.last_visited_index = filter + '/' + id;
    this.index_view().render().filterBy(filter, id);
  },

  detail: function(id){
    this.detail_view(id).render();
  },

  last_index: function(){
    this.navigate(this.last_visited_index, true);
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
        router: this
      });
    }
    this.detailView.case_id = id;
    return this.detailView;
  }

});
