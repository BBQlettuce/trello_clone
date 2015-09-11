TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({card: this.model}));
    return this;
  }
})
