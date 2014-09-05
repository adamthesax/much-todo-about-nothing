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
            "change" : "onChange",
            "click #remove" : "onRemove",
            "keydown input" : "onKeyDown"
        },

        onRender: function() {
            this.$el.addClass("list-group-item");
        },

        onChange: function(event) {
            if (event.target.type == "checkbox") event.target.value = event.target.checked;
            this.model.set(event.target.name, event.target.value);
        },

        onRemove: function() {
            this.trigger("remove", this.model);
        },

        onKeyDown: function(event) {
            switch(event.which) {
                case 46: // delete
                case 8: // backspace
                    if (event.target.value.length === 0) {
                        this.trigger("remove", this.model, true);
                        return false;
                    }
            }
        }



   });

    return TodoListItem;
});
