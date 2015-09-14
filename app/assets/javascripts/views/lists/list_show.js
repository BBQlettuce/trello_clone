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
    "click .delete-list": "deleteList"
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

  renderCardAdder: function(e) {
    e.preventDefault();
    $div = $(e.currentTarget);
    $div.removeClass('card-adder').addClass('card-add-box').empty();
    var subview = new TrelloClone.Views.ListAdder({collection: this.collection, model: this.model});
    this.addSubview('.card-add-box', subview);
    $div.find('.card-adder-prompt').focus();
  },

  deleteList: function(e) {
    e.preventDefault();
    this.remove();
    this.model.destroy();
  }

})
