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
      "change .rgb .number-widget input": "changeColorRgb",
      "change .hsl .number-widget input": "changeColorHsl",
      "click .number-widget .up": "incrementValue",
      "click .number-widget .down": "decrementValue"
    },

    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.setupRemove, this);
    },

    render: function() {
      var color = this.model.color();

      this.$el.html(this.template({
        colorHex: color.hexString(),
        r: color.red(),
        g: color.green(),
        b: color.blue(),
        h: color.hue(),
        s: color.saturation(),
        l: color.lightness()
      }));

      this.$('.color').css({
        backgroundColor: color.hslString()
      });

      if(color.lightness() > 50) {
        this.$el.addClass('light');
      }

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

    changeColorRgb: function(event) {
      var r = this.$('[data-type="red"]').val(),
          g = this.$('[data-type="green"]').val(),
          b = this.$('[data-type="blue"]').val();
      this.model.color().red(r)
        .green(g)
        .blue(b);
      this.model.trigger("change");
    },

    changeColorHsl: function(event) {
      var h = this.$('[data-type="hue"]').val(),
          s = this.$('[data-type="saturation"]').val(),
          l = this.$('[data-type="lightness"]').val();
      this.model.color().hue(h)
        .saturation(s)
        .lightness(l);
      this.model.trigger("change");
    },

    incrementValue: function(event) {
      event.preventDefault();
      var type = $(event.target).parents('.number-widget').find('input').data('type');
      var color = this.model.color();
      color[type](color[type]() + 1);
      this.model.trigger("change");
    },

    decrementValue: function(event) {
      event.preventDefault();
      var type = $(event.target).parents('.number-widget').find('input').data('type');
      var color = this.model.color();
      color[type](color[type]() - 1);
      this.model.trigger("change");
    }
  });
});