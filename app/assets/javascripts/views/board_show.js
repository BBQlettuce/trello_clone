TrelloClone.Views.BoardShow = Backbone.View.extend({
  template: JST['board_show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({board: this.model}));
    return this;
  }

})