  var app = app || {};

$(function() {
  "use strict";

  var ColorRouter = Backbone.Router.extend({
    routes: {
      "_*colors": "setColors"
    },

    setColors: function(param) {
      var colors = param.split(",");

      colors = _.reject(colors, function(color) {
        return color.length == 0;
      });

      _.each(colors, function(color) {
        app.Colors.addFromHex(color);
      });
    },

    /**
     * Pushes the current Colors state to the path
     */
    pushColorState: function() {
      var hash = app.Colors.reduce(function(memo, color) {
        console.log(memo, color);
        return memo + color.hexCss() + ',';
      }, "_");

      this.navigate(hash, {trigger: false});
    }
  });

  app.Router = new ColorRouter();
});