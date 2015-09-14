TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  className: 'board',

  events: {
    "click .list-adder": "renderListAdder",
    "blur .list-add-box": "killListAdder",
    "click .delete-board": "deleteBoard"
  },

  initialize: function() {
    // var listsCollection = this.model.lists();
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addListView);
    this.listenTo(this.model.lists(), "remove", this.removeListView);
    this.model.lists().each(this.addListView.bind(this));
  },

  // listsCollection: function() {
  //   return this.model.lists();
  // },

  addListView: function(list) {
    var subview = new TrelloClone.Views.ListShow({model: list});
    this.addSubview('.list-list', subview);
  },

  removeListView: function(list) {
    this.removeModelSubview('.list-list', list);
  },

  render: function() {
    // debugger
    this.$el.html(this.template({board: this.model}));
    this.attachSubviews();
    return this;
  },

  renderListAdder: function(e) {
    e.preventDefault();
    $div = $(e.currentTarget);
    $div.removeClass('list-adder').addClass('list-add-box').empty();
    var subview = new TrelloClone.Views.ListAdder({collection: this.model.lists(), model: this.model});
    this.addSubview('.list-add-box', subview);
    $div.find('.list-adder-prompt').focus();
  },

  killListAdder: function(e) {
    e.preventDefault();
    if (!e.relatedTarget || e.relatedTarget.type!=='submit') {
      $div = $(e.currentTarget);
      var subviews = this.subviews('.list-add-box');
      subviews.each(this.removeSubview.bind(this, '.list-add-box'));
      $div.removeClass('list-add-box').addClass('list-adder').html("Add a list!");
    }
  },

  deleteBoard: function(e) {
    e.preventDefault();
    this.remove();
    this.model.destroy();
    Backbone.history.navigate("", {trigger: true});
  }

})
