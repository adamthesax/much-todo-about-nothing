'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'model/list',
    'marionette'
], function ($, _, Backbone, ListModel) {

    var NoListView = Backbone.Marionette.ItemView.extend({
       template: _.template("you have no items!")
    });

    var TodoListItem = Backbone.Marionette.ItemView.extend({
        template: _.template("<%= value %>"), // "script#list-selector-item"
        tagName: "li",

        onRender: function() {
            this.$el.addClass("list-group-item");
        }
    })

    var TodoList = Backbone.Marionette.CollectionView.extend({
        childView: TodoListItem,
        emptyView: NoListView,
        tagName: "ul",

        onRender: function() {
            this.$el.addClass("list-group");
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
        }
    });

    return TodoList;
});