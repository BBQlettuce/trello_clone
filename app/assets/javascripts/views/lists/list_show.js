TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],

  initialize: function() {
    // debugger
    this.collection = this.model.cards();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addCardView);
    this.collection.each(this.addCardView.bind(this));
  },

  // events: {
  //
  // },

  addCardView: function(card) {
    var subview = new TrelloClone.Views.CardShow({model: card});
    this.addSubview('.card-list', subview);
  },

  render: function() {
    this.$el.html(this.template({list: this.model}))
    this.attachSubviews();
    return this;
  }
})
