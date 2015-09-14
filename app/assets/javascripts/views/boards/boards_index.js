TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  mainTemplate: JST['boards/index'],
  itemTemplate: JST['boards/index_item'],

  className: 'boards-index',

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.render);
    this.listenTo(this.collection, "remove", this.render);
  },

  render: function() {
    this.$el.html(this.mainTemplate());
    this.collection.each(function(board) {
      this.$('.board-list').append(this.itemTemplate({board: board}))
    }.bind(this));

    return this;
  }
})
