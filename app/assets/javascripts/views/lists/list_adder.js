TrelloClone.Views.ListAdder = Backbone.View.extend({
  template: JST['lists/list_adder'],

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
    // debugger
    newList.save(data, {
      success: function(model) {
        this.collection.add(model);
        this.$el.trigger("submitted");
      }.bind(this)
    });
  }

})
