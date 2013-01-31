var app = app || {};

$(function() {
  "use strict";

  app.SwatchAppView = Backbone.View.extend({
    el: "#swatches",

    events: {
      "click #edit": "snapColor"
    },

    initialize: function() {
      app.Colors.on("add", this.addOne, this);
      app.Colors.on("reset", this.addAll, this);
      app.Colors.on("remove", this.layout, this);

      this.editModel = new app.Color();
      this.editModel.on("change", this.render, this);

      this.$("#edit").mousemove(_.bind(this.move, this));
      this.$("#edit").scroll(_.bind(this.scale, this)).scrollTop(500);
    },

    render: function() {
      this.$("#edit").css({
        "background": this.editModel.hslCss()
      });
    },

    layout: function() {
      var w = $(window).width(),
          sliceSize = Math.floor(w / (app.Colors.length + 3));

      this.$('li:not(#edit):not(.destroyed)').each(function(i, el) {
        $(el).css({
          left: i * sliceSize,
          width: sliceSize,
        })
      });

      this.$("#edit").css({
        left: app.Colors.length * sliceSize,
      });
    },

    addOne: function(color) {
      var view = new app.ColorView({model: color});
      this.$el.append(view.render().el);

      view.$el.css({
        left: this.$("#edit").css("left"),
        width: this.$("#edit").css("width"),
        "background": "#fff"
      });

      // defer the render for a frame
      setTimeout(_.bind(function() {
        view.$el.addClass("animating");
        view.$el.css("background", view.model.hslCss());
        this.layout();
      }, this), 0);
      
    },

    addAll: function() {
      this.$.el.html('');
      app.Colors.each(this.addOne, this);
    },

    snapColor: function(event) {
      app.Colors.add({
        h: this.editModel.get("h"),
        s: this.editModel.get("s"),
        l: this.editModel.get("l"),
      });
    },

    move: function(event) {
      var editEl = this.$("#edit"),
          w = editEl.width(),
          h = editEl.height(),
          x, y, offset, hue, sat, col;

      offset = editEl.offset();

      x = Math.max(0, event.pageX - offset.left);
      y = Math.max(0, event.pageY - offset.top);

      hue = Math.floor(x / w * 360),
      sat = Math.floor(y / h * 100);

      this.editModel.set({
        h: hue,
        s: sat
      });
    },

    scale: function(event) {
      var offset = this.$("#edit").scrollTop() / 10;
      offset = Math.max(0, Math.min(100, offset));

      this.editModel.set({
        l: offset
      });
    }

  });

});