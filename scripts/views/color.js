var app = app || {};

$(function() {
  "use strict";

  app.ColorView = Backbone.View.extend({
    
    tagName: "li",

    render: function() {
      this.$el.css({
        background: this.model.hslCss()
      });

      return this;
    }

  });
});