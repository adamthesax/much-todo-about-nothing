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

        index: function() {
            var lists = new ListsCollection();

            this.selector = new ListSelectorView({
                el: "#sidebar",
                collection: lists
            }).render();

            this.todoList = new TodoListView({
               el: "#content"
            }).render();

            this.selector.on("select", function(listId) {
                this.todoList.setList(listId);
            }, this);

            this.todoList.on("delete", function(list) {
              lists.remove(list);
              list.destroy();
              this.selector.setList(lists.at(lists.length-1).get('id'));
            }, this);

            lists.fetch();
        },

        showList: function(id) {
            this.index();
            this.selector.setList(id);
        },

        show404: function() {
        }
    });

    return Router;

});