TrelloClone.Views.ListAdder = Backbone.View.extend({
  template: JST['cards/card_adder'],

  tagName: 'form',
  className: 'new-card-form',

  events: {
    "click .submit-button": "saveCard"
  },

  initialize: function() {
    // this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({list: this.model}));
    return this;
  },

  saveCard: function(e) {
    e.preventDefault();
    var data = this.$el.serializeJSON();
    var newCard = new TrelloClone.Models.Card();
    newCard.save(data, {
      success: function(model) {
        this.collection.add(model);
      }.bind(this)
    });
  }

})