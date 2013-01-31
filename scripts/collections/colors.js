var app = app || {};

$(function() {
  "use strict";

  app.ColorList = Backbone.Collection.extend({
    model: app.Color
  });

  // Global color collection
  app.Colors = new app.ColorList();
});