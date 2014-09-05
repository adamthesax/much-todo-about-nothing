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

    var NoListView = Backbone.Marionette.ItemView.extend({
       template: _.template("you have no items!")
    });

    var TodoList = Backbone.Marionette.CompositeView.extend({
        template: "script#todo-list",
        childView: TodoListItem,
        childViewContainer: "ul.list-group",
        emptyView: NoListView,
        tagName: "ul",

        events: {
            "click #new" : "addTodoItem",
            "click #delete" : function() {
                this.trigger("delete", this.model);
            },
            'change input[name="name"]': "onNameChange",
            "keydown input.todo" : "onKeyDown"
        },

        onRender: function() {
            this.$el.addClass("list-group");
        },

        onAddChild: function(childView) {
            childView.on("remove", function(model, selectPrevious) {
                // focus on the previous to do input
                if (selectPrevious) {
                    var itemIndex = this.collection.indexOf(model);
                    var previousInput = this.children.findByIndex(itemIndex-1).$el.find("input.todo");
                    previousInput.focus();

                    // stupid trick to select the end of the input
                    previousInput.val(previousInput.val());
                }

                // remove the view
                this.collection.remove(model);
            }, this);
        },

        setList: function(listId) {
            Backbone.history.navigate("/list/" + listId);

            if (!_.isUndefined(this.model))
                this.model.off("autosave", this.onAutosave);

            this.model = new ListModel({id: listId});
            this.model.once("sync", function() {
                this.collection = this.model.get("items");
                this._initialEvents();
                this.render();
            }, this);
            this.model.on("autosave", this.onAutosave, this);
            this.model.fetch();
        },

        onAutosave: function() {
            alert("got saving!");
        },

        addTodoItem: function() {
            // add a new model to the collection
            this.collection.add(new ListItemModel());

            // focus on our new input
            this.$el.find('li:last-child>input[type="text"]').focus();
        },

        onNameChange: function(event) {
            this.model.set(event.target.name, event.target.value);
            this.trigger("change");
        },

        onKeyDown: function(event) {
            switch(event.which) {
                case 13:    // enter
                    this.addTodoItem();
                    break;

            }
        }

    });

    return TodoList;
});