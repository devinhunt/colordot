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

    /**
     * Sets this models color to a color stored in
     * a Color object
     */
    setColor: function(color) {
      this.set({
        h: color.hue(),
        s: color.saturation(),
        l: color.lightness()
      });
    },

    hslCss: function() {
      return this.getColor().hslString();
    },

    rgbCss: function() {
      return this.getColor().rgbString();
    },

    hexCss: function() {
      return this.getColor().hexString();
    }

  });

});