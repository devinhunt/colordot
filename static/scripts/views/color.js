var app = app || {};

$(function() {
  "use strict";

  app.ColorView = Backbone.View.extend({

    tagName: "li",
    className: "swatch",

    template: _.template( $("#template-color").html() ),

    isIncrementing: false,

    events: {
      "click .destroy": "destroy",
      "click .meta-details": "toggleDetails",
      "change .rgb .number-widget input": "changeColorRgb",
      "change .hsl .number-widget input": "changeColorHsl",
      "mousedown .number-widget .up": "incrementValue",
      "mousedown .number-widget .down": "decrementValue"
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
      this.repeater(type, 1);
    },

    decrementValue: function(event) {
      event.preventDefault();
      var type = $(event.target).parents('.number-widget').find('input').data('type');
      this.repeater(type, -1);
    },

    repeater: function(type, amount) {
      var model = this.model,
          color = model.color();

      var action = function() {
        color[type](color[type]() + amount);
        model.trigger("change");
      }
      action();

      var intervalId = setInterval(action, 100);

      $(window).one("mouseup", function() {
        clearInterval(intervalId);
      });
    }
  });
});