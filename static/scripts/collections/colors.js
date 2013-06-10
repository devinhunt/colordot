var app = app || {};

$(function() {
  "use strict";

  app.ColorList = Backbone.Collection.extend({
    model: app.Color,

    addFromHex: function(hex) {
      var c = Color(hex);
      this.add({color: c});
    }
  });

  // Global color collection
  app.Colors = new app.ColorList();
});