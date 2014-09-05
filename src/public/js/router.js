'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'view/list_selector',
    'view/todo_list',
    'collection/lists'
], function ($, _, Backbone, ListSelectorView, TodoListView, ListsCollection)  {

    var Router = Backbone.Router.extend({

        routes: {
            "" : "index",
            "list/:id" : "showList",
            "*404" : "show404"
        },

        initialize: function() {
            // create our lists collection
            this.lists = new ListsCollection();

            // create the side selector view
            this.selector = new ListSelectorView({
                el: "#sidebar",
                collection: this.lists
            }).render();

            // create the main to do list view
            this.todoList = new TodoListView({
               el: "#content"
            }).render();

            // when something is selected in the selector update the to do list
            this.selector.on("select", function(listId) {
                this.todoList.setList(listId);
            }, this);

            // handle deleting a list
            this.todoList.on("delete", function(list) {
              this.lists.remove(list);
              list.destroy();
              this.selector.setList(this.lists.at(this.lists.length-1).get('id'));
            }, this);

            // when a list changes its name we should regrab out list
            this.todoList.on("change", function() {
                this.lists.fetch({reset: true});
            }, this);

            // fetch the lists
            this.lists.fetch();
        },

        index: function() {
            if(this.lists.length > 0) {
              this.selector.setList(this.selector.at(0).get("id"));
            } else {
                this.lists.once("add", function(model) {
                   this.selector.setList(model.get("id"));
                }, this);
            }
        },

        showList: function(id) {
            this.selector.setList(id);
        },

        show404: function() {
        }
    });

    return Router;

});