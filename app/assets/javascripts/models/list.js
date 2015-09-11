TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: "api/lists",

  // parse: function(response) {
  //   if (response.cards) {
  //     // console.log(response.cards);
  //     this.cards().set(response.cards);
  //     delete response.cards;
  //   }
  //   return response;
  // },

  cards: function() {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards([], {list: this});
    }
    if (this.attributes.cards) {
      this._cards.set(this.attributes.cards);
    }
    return this._cards;
  }

})
