TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],

  className: 'list',

  initialize: function() {
    // this.collection = this.model.cards();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCardView);
    this.listenTo(this.model.cards(), "remove", this.removeListView);
    this.model.cards().each(this.addCardView.bind(this));

    this.$el.on("submitted", this.killCardAdder.bind(this));
  },

  events: {
    "click .card-adder": "renderCardAdder",
    "blur .card-add-box": "killCardAdder",
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
    this.$('.sortable').sortable();
    return this;
  },

  renderCardAdder: function(e) {
    e.preventDefault();
    $div = $(e.currentTarget);
    $div.removeClass('card-adder').addClass('card-add-box').empty();
    var subview = new TrelloClone.Views.CardAdder({collection: this.model.cards(), model: this.model});
    this.addSubview('.card-add-box', subview);
    $div.find('.card-adder-prompt').focus();
  },

  killCardAdder: function(e) {
    e.preventDefault();
    if (!e.relatedTarget || e.relatedTarget.type !== 'submit') {
      debugger
      var $div = $('.card-add-box');
      if ($div.length !== 0) {
        var subviews = this.subviews('.card-add-box');
        subviews.each(this.removeSubview.bind(this, '.card-add-box'));
        $div.removeClass('card-add-box').addClass('card-adder').html("Add a card...");
      }
    }
  },

  deleteList: function(e) {
    e.preventDefault();
    this.remove();
    this.model.destroy();
  }

})
