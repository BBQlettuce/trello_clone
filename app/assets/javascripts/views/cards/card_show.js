TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],

  events: {
    "click .delete-card": "deleteCard"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({card: this.model}));
    return this;
  },

  deleteCard: function(e) {
    e.preventDefault();
    this.remove();
    this.model.destroy();
  }
})
