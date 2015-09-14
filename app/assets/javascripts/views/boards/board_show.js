TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  className: 'board',
  
  events: {
    "click .list-adder": "renderListAdder",
    "blur .add-box": "killListAdder"
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

  renderListAdder: function(e) {
    e.preventDefault();
    $div = $(e.currentTarget);
    $div.removeClass('list-adder').addClass('add-box').empty();
    var subview = new TrelloClone.Views.ListAdder({collection: this.collection, model: this.model});
    this.addSubview('.add-box', subview);
    $div.find('.list-adder-prompt').focus();
  },

  killListAdder: function(e) {
    e.preventDefault();
    if (!e.relatedTarget || e.relatedTarget.type!=='submit') {
      $div = $(e.currentTarget);
      var subviews = this.subviews('.add-box');
      subviews.each(this.removeSubview.bind(this, '.add-box'));
      $div.removeClass('add-box').addClass('list-adder').html("Add a list!");
    }
  }

})
