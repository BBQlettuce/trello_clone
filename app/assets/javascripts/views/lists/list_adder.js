TrelloClone.Views.ListAdder = Backbone.View.extend({
  template: JST['lists/add_form'],

  tagName: 'form',
  className: 'new-list-form',

  events: {
    "click .submit-button": "saveList"
  },

  initialize: function() {
    // this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({board: this.model}));
    return this;
  },

  saveList: function(e) {
    e.preventDefault();
    var data = this.$el.serializeJSON();
    var newList = new TrelloClone.Models.List();
    newList.save(data, {
      success: function(model) {
        this.collection.add(model);
      }.bind(this)
    });
  }

})
