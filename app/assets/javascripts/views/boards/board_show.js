TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  events: {
    // "click .list-adder": "renderListAdder",
    "submit .list-adder": "saveList"
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

  // renderListAdder: function(e) {
  //   e.preventDefault();
  //   var $listAdder = $(e.currentTarget);
  //   var $addButton = $("<input type='submit' value='Create List'>");
  //   $listAdder.append($addButton);
  //   $listAdder.empty()
  //   $listAdder.html($form);
  // },

  // killListAdder: function() {
  //   $('.list-adder').html("<input type='text' value='Add a list!'>");
  // },

  saveList: function(e) {
    e.preventDefault();
    var data = $(e.currentTarget).serializeJSON();
    var newList = new TrelloClone.Models.List();
    newList.save(data, {
      success: function(model) {
        this.collection.add(model);
      }.bind(this)
    });

    $('.list-adder-prompt').val('Add a list!');
  }

})
