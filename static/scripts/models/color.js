var app = app || {};

$(function() {
  "use strict";

  app.Color = Backbone.Model.extend({
    defaults: {
      color: new Color()
    },

    /**
     * Setter and getter for manipulable color objects
     */
    color: function(color) {
      if(color) {
        this.set({color: color})
      }
      return this.get("color");
    },

    hslCss: function() {
      return this.color().hslString();
    },

    rgbCss: function() {
      return this.color().rgbString();
    },

    hexCss: function() {
      return this.color().hexString();
    }

  });

});