TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],

  className: 'list',

  initialize: function() {
    // debugger
    this.collection = this.model.cards();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addCardView);
    this.listenTo(this.collection, "remove", this.removeListView);
    this.collection.each(this.addCardView.bind(this));
  },

  events: {
    "click .card-adder": "renderCardAdder",
    "click .delete-list": "delete-list"
  },

  addCardView: function(card) {
    var subview = new TrelloClone.Views.CardShow({model: card});
    this.addSubview('.card-list', subview);
  },

  removeCardView: function(card) {
    this.removeModelSubview('.card-list', list);
  },

  render: function() {
    this.$el.html(this.template({list: this.model}))
    this.attachSubviews();
    return this;
  },


})
