TrelloClone.Views.ListAdder = Backbone.View.extend({
  template: JST['lists/add_form'],

  events: {
    "submit .list-adder-form": "saveList"
  },

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({board: this.model}));
    return this;
  },

  saveList: function(e) {
    e.preventDefault();
    var data = $(e.currentTarget).serializeJSON();
    debugger
    var newList = new TrelloClone.Models.List();
    newList.save(data, {
      success: function(model) {
        this.collection.add(model);
      }.bind(this)
    });

  }

})
