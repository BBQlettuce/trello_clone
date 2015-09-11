TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  mainTemplate: JST['boards_index'],
  itemTemplate: JST['boards_index_item'],

  tagName: 'ul',

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.mainTemplate());
    this.collection.each(function(board) {
      this.$('.board-list').append(this.itemTemplate({board: board}))
    }.bind(this));

    return this;
  }
})
