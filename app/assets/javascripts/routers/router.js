TrelloClone.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.collection = new TrelloClone.Collections.Boards();
    // this.collection.fetch({reset:true})
  },

  routes: {
    "": "boardsIndex",
    "boards/new": "boardNew",
    "boards/:id": "boardShow",
  },

  boardsIndex: function() {
    var view = new TrelloClone.Views.BoardsIndex({collection: this.collection});
    this.collection.fetch({reset: true});
    this._swapView(view);
  },

  boardNew: function() {
    var view = new TrelloClone.Views.BoardNew({collection: this.collection});
    this._swapView(view);
  },

  boardShow: function(id) {
    var board = this.collection.getOrFetch(id);
    var view = new TrelloClone.Views.BoardShow({model: board});
    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

})
