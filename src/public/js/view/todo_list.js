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
            "click button#new" : "addTodoItem"
        },

        onRender: function() {
            this.$el.addClass("list-group");
        },

        onAddChild: function(childView) {
            childView.on("remove", function(model) {
               this.collection.remove(model);
            }, this);
        },

        setList: function(listId) {

            Backbone.history.navigate("/list/" + listId);
            this.model = new ListModel({id: listId});
            this.model.once("sync", function() {
                this.collection = new Backbone.Collection(this.model.get("items"));
                this._initialEvents();
                this.render();
            }, this);
            this.model.fetch();
        },


        addTodoItem: function() {
            this.collection.add(new ListItemModel());
        }
    });

    return TodoList;
});