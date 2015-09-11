TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  events: {
    "dblclick .list-adder": "renderListAdder"
    // "blur .list-adder": "killListAdder"
  },

  initialize: function() {
    this.collection = this.model.lists();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addListView);
    this.collection.each(this.addListView.bind(this));
  },

  addListView: function(list) {
    var subview = new TrelloClone.Views.ListShow({model: list});
    this.addSubview('.list-list', subview);
  },

  render: function() {
    this.$el.html(this.template({board: this.model}));
    this.attachSubviews();
    return this;
  },

  renderListAdder: function() {
    var subview = new TrelloClone.Views.ListAdder({collection: this.collection, model: this.model});
    this.addSubview('.list-adder', subview);
  },

  killListAdder: function() {
    var subviews = this.subviews('.list-adder');
    subviews.each(this.removeSubview.bind(this, '.list-adder'));
  }

})
