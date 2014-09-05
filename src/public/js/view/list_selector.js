'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'model/list',
    'marionette'
], function ($, _, Backbone, ListModel) {

    var ListItem = Backbone.Marionette.ItemView.extend({
        template: "script#list-selector-item",
        tagName: "li",

        onRender: function() {
            this.$el.addClass("list-group-item");
        },

        events: {
            "click": function() {
                this.trigger("select", this.model.get("id"));
            }
        }
    });

    var ListSelector = Backbone.Marionette.CompositeView.extend({
        template: "script#list-selector",
        childView: ListItem,
        childViewContainer: "ul#list-selector-list",

        events: {
            "click #new" : "newList"
        },

        onAddChild: function(childView) {
            // when a child is added set it's DOM id to the list id
            childView.$el.attr("id", childView.model.get("id"));

            // wire up selection event
            childView.on("select", this.setList, this);

            // if the view we are adding is selected, add the active class
            if (!_.isUndefined(this.selectedId) && childView.model.get("id") == this.selectedId)
                childView.$el.addClass("active");
        },

        setList: function(listId) {
           this.selectedId = listId;
           this.$el.find("li.active").removeClass("active");
           this.$el.find("#"+listId).addClass("active");
           this.trigger("select", listId);
        },

        newList: function() {
            var list = new ListModel();
            list.save({}, {
                success: $.proxy(function() {
                    this.collection.add(list);
                    this.setList(list.get("id"));
                }, this)
            });
        }
    });

    return ListSelector;
});