'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'model/list',
    'marionette'
], function ($, _, Backbone, ListModel) {
    var TodoListItem = Backbone.Marionette.ItemView.extend({
        template: "script#todo-list-item",
        tagName: "li",

        events: {
            "change" : "onChange"
        },

        onRender: function() {
            this.$el.addClass("list-group-item");
        },

        onChange: function(event) {
            if (event.target.type == "checkbox") event.target.value = event.target.checked;
            this.model.set(event.target.name, event.target.value);
        }
    });

    return TodoListItem;
});
