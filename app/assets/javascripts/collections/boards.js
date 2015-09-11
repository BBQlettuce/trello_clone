TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: "api/boards",
  model: TrelloClone.Models.Board,

  getOrFetch: function(id) {
    var collection = this;
    var board = collection.get(id);
    if (board) {
      board.fetch();
    } else {
      board = new collection.model({id: id});
      collection.add(board);
      board.fetch({
        error: function() {collection.remove(board)}
      })
    }

    return board;
  }
})
