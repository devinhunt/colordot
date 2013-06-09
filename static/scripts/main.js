var app = app || {};
$(function() {
  window.dapp = new app.SwatchAppView();
  Backbone.history.start();
});