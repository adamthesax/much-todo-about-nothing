'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette'
], function ($, _, Backbone) {

    var ListItem = Backbone.Marionette.ItemView.extend({
        template: _.template("<%= name %>"), // "script#list-selector-item"
        tagName: "li",

        onRender: function() {
            this.$el.addClass("list-group-item");
        },

        events: {
            "click": function() {
                this.trigger("select", this);
            }
        }
    })

    var ListSelector = Backbone.Marionette.CompositeView.extend({
        template: "script#list-selector",
        childView: ListItem,
        childViewContainer: "ul#list-selector-list",

        onAddChild: function(childView) {
            childView.on("select", this.listSelected, this);
        },

        listSelected: function(listItemView) {
           this.$el.find("li.active").removeClass("active");
           listItemView.$el.addClass("active");
           this.trigger("select", listItemView.model.get("id"));
        }
    });

    return ListSelector;
});