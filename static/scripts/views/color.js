var app = app || {};

$(function() {
  "use strict";

  app.ColorView = Backbone.View.extend({

    tagName: "li",
    className: "swatch",

    template: _.template( $("#template-color").html() ),

    events: {
      "click .destroy": "destroy",
      "click .meta-details": "toggleDetails"
    },

    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.setupRemove, this);
    },

    render: function() {
      this.$el.html(this.template({
        colorHex: this.model.hexCss(),
        colorRgb: this.model.rgbCss(),
        colorHsl: this.model.hslCss()
      }));

      this.$('.color').css({
        backgroundColor: this.model.hslCss()
      });

      return this;
    },

    destroy: function(event) {
      event.preventDefault();
      this.model.destroy();
    },

    setupRemove: function() {
      this.$el.addClass("destroyed").css("z-index", 0);
      setTimeout(_.bind(function() {
        this.remove();
      }, this), 500);
    },

    toggleDetails: function(event) {
      event.preventDefault();
      this.$el.toggleClass("show-details");
    }

  });
});