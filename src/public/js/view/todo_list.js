'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'model/list',
    'model/list_item',
    'view/todo_list_item',
    'marionette',
    'jquery-ui'
], function ($, _, Backbone, ListModel, ListItemModel, TodoListItem) {

    var TodoList = Backbone.Marionette.CompositeView.extend({
        template: "script#todo-list",
        childView: TodoListItem,
        childViewContainer: "ul.list-group",
        tagName: "ul",

        events: {
            "click #new" : "addTodoItem",
            "click #delete" : "deleteList",
            'change input[name="name"]': "onNameChange",
            "keydown input.todo" : "onKeyDown"
        },

        onRender: function() {
            this.$el.addClass("list-group");
        },

        getTemplate: function() {
            return this.collection ?"script#todo-list" : "script#empty-lists";
        },

        onAddChild: function(childView) {
            childView.on("remove", function(model, selectPrevious) {
                // focus on the previous to do input
                if (selectPrevious) {
                    var itemIndex = this.collection.indexOf(model);
                    if (itemIndex > 0) {
                        var previousInput = this.children.findByIndex(itemIndex-1).$el.find("input.todo");
                        this.selectPreviousItem(previousInput);
                    }
                }

                // remove the view
                this.collection.remove(model);
            }, this);
        },

        setList: function(listId) {
            // set the url to current list
            Backbone.history.navigate("/list/" + listId);

            this.render();

            // if we already have an existing model, stop listening for events
            if (!_.isUndefined(this.model)) {
                this.model.off("autosave:start", this.onAutosaveStart);
                this.model.off("autosave:success", this.onAutosaveSuccess);
            }

            this.model = new ListModel({id: listId});
            this.model.once("sync", function() {
                this.collection = this.model.get("items");
                this._initialEvents();
                this.render();
            }, this);

            this.model.on("autosave:start", this.onAutosaveStart, this);
            this.model.on("autosave:success", this.onAutosaveSuccess, this);
            this.model.fetch();
        },

        onAutosaveStart: function() {
            this.$el.find("#autosave-notification")
                .html('<p class="muted">saving</p>')
                .fadeIn();
        },

        onAutosaveSuccess: function() {
            this.$el.find("#autosave-notification")
                .html('<p class="text-success">saved!</p>')
                .delay(1000)
                .fadeOut();
        },

        addTodoItem: function() {
            // add a new model to the collection
            this.collection.add(new ListItemModel());

            // focus on our new input
            this.$el.find('li:last-child input[type="text"]').focus();
        },

        onNameChange: function(event) {
            this.model.set(event.target.name, event.target.value);
            this.trigger("change");
        },

        selectPreviousItem: function(item) {
            var prev = item || $(document.activeElement).parent().prev().find('input[type="text"]')

            if (prev.length > 0) {
                prev.focus();
                prev.val(prev.val());
                return true;
            }
            return false;
        },

        selectNextItem: function(item) {
            var next = item || $(document.activeElement).parent().next().find('input[type="text"]')

            if (next.length > 0) {
                next.focus();
                next.val(next.val());
                return true;
            }
            return false;
        },

        onKeyDown: function(event) {
            switch(event.which) {
                case 13:    // enter
                    if(!this.selectNextItem())
                        this.addTodoItem();
                    break;

                case 38: // up arrow
                    this.selectPreviousItem();
                    break;

                case 40:
                    this.selectNextItem();
                    break;
            }
            return true;
        },

        deleteList: function() {
            this.trigger("delete", this.model);
        }

    });

    return TodoList;
});