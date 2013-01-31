var app = app || {};

$(function() {
  "use strict";

  app.Color = Backbone.Model.extend({
    defaults: {
      h: 0,
      s: 0,
      l: 0
    },

    /**
     * Returns a manipulable color object
     */
    getColor: function() {
      return Color({
        h: this.get("h"),
        s: this.get("s"),
        l: this.get("l")
      });
    },

    hslCss: function() {
      return this.getColor().hslString();
    }

  });

});