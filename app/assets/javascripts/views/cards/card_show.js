TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addListView);
    this.listenTo(this.collection, "remove", this.removeListView);
  },

  render: function() {
    this.$el.html(this.template({card: this.model}));
    return this;
  }
})
