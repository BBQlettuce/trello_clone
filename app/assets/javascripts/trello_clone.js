window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // alert("Hello from Backbone!");
    new TrelloClone.Routers.Router({$rootEl: $("#main")});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});
