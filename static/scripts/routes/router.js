  var app = app || {};

$(function() {
  "use strict";

  var ColorRouter = Backbone.Router.extend({
    routes: {
      "*colors": "setColors"
    },

    initialize: function(ops) {
      app.Colors.on("add", this.pushColorState, this);
      app.Colors.on("remove", this.pushColorState, this);
    },

    setColors: function(param) {
      var colors = param.split(",");

      colors = _.reject(colors, function(color) {
        console.log(color);
        return color.length == 0;
      });

      app.Colors.reset();

      _.each(colors, function(color) {
        app.Colors.addFromHex("#" + color);
      });
    },

    /**
     * Pushes the current Colors state to the path
     */
    pushColorState: function() {
      var hash = app.Colors.reduce(function(memo, color) {
        return memo + color.hexCss().substr(1) + ',';
      }, "");

      this.navigate(hash, {trigger: false, replace: true});
    }
  });

  app.Router = new ColorRouter();
});