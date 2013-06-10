var app = app || {};

$(function() {
  "use strict";

  app.ColorView = Backbone.View.extend({

    tagName: "li",
    className: "swatch",

    template: _.template( $("#template-color").html() ),

    events: {
      "click .destroy": "destroy",
      "click .meta-details": "toggleDetails",
      "change .number-input input": "changeColorInput",
      "click .number-input .up": "incrementValue",
      "click .number-input .down": "decrementValue"
    },

    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.setupRemove, this);
    },

    render: function() {
      var color = this.model.getColor();

      this.$el.html(this.template({
        colorHex: color.hexString(),
        r: color.red(),
        g: color.green(),
        b: color.blue()
      }));

      this.$('.color').css({
        backgroundColor: color.hslString()
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
    },

    changeColorInput: function(event) {
      var color = this.model.getColor();
      var valueType = $(event.target).data('type');
      var value = $(event.target).val();
      color[valueType](value);
      this.model.setColor(color);
    },

    incrementValue: function(event) {
      event.preventDefault();
      var type = $(event.target).siblings('input').data('type');
      var color = this.model.getColor();
      console.log(color[type]() + 1);
      color[type](color[type]() + 1);
      this.model.setColor(color);
    },

    decrementValue: function(event) {
      event.preventDefault();
    }
  });
});