TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function() {
    this.collection = this.model.lists();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addListView);
    this.collection.each(this.addListView.bind(this));
  },

  addListView: function(list) {
    // debugger
    var subview = new TrelloClone.Views.ListShow({model: list});
    this.addSubview('.list-list', subview);
  },

  render: function() {
    this.$el.html(this.template({board: this.model}));
    this.attachSubviews();
    return this;
  }

})
