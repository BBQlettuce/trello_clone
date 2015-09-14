TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: "api/lists",

  parse: function(response) {

    if (response.cards) {
      this.cards().set(response.cards);
      delete response.cards;
    }
    return response;
  },

  cards: function() {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards([]);
    }
    // if (this.attributes.cards) {
    //   this._cards = new TrelloClone.Collections.Cards(this.attributes.cards);
    // }
    return this._cards;
  }

})
