var app = app || {};

$(function() {
  "use strict";

  app.ColorView = Backbone.View.extend({
    
    tagName: "li",

    template: _.template('<button class="remove">x</button>'),

    events: {
      "click .remove": "destroy"
    },

    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.setupRemove, this);
    },

    render: function() {
      this.$el.css({
        background: this.model.hslCss()
      }).html(this.template());

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
    }

  });
});