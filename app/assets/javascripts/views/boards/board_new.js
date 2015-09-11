TrelloClone.Views.BoardNew = Backbone.View.extend({
  template: JST['boards/new'],

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.model = new TrelloClone.Models.Board()
  },

  events: {
    "submit .new-board-form": "createNewBoard"
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  createNewBoard: function(e) {
    e.preventDefault();
    var attrs = $(e.currentTarget).serializeJSON();
    this.model.save(attrs, {
      success: function() {
        this.collection.add(this.model);
        Backbone.history.navigate("#boards/" + this.model.id, {trigger:true})
      }.bind(this),
      error: function(model, response) {
        $('#errors').empty();
        $('#errors').html(response.responseText);
      }
    })
  }

})
