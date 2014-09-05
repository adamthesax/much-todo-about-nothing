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
                this.trigger("select", this.model.get("id"));
            }
        }
    })

    var ListSelector = Backbone.Marionette.CompositeView.extend({
        template: "script#list-selector",
        childView: ListItem,
        childViewContainer: "ul#list-selector-list",

        onAddChild: function(childView) {
            childView.$el.attr("id", childView.model.get("id"));
            childView.on("select", this.setList, this);
            if (!_.isUndefined(this.selectedId) && childView.model.get("id") == this.selectedId)
                childView.$el.addClass("active");
        },

        setList: function(listId) {
           this.selectedId = listId;
           this.$el.find("li.active").removeClass("active");
           this.$el.find("#"+listId).addClass("active");
           this.trigger("select", listId);
        }
    });

    return ListSelector;
});