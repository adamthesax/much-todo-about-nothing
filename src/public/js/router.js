'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'view/list_selector',
    'collection/lists'
], function ($, _, Backbone, ListSelectorView, ListsCollection)  {

    var Router = Backbone.Router.extend({

        routes: {
            "" : "index",
            "list/:id" : "showList",
            "*404" : "show404"
        },

        index: function() {
            var lists = new ListsCollection();
            new ListSelectorView({
                el: "#sidebar",
                collection: lists
            }).render();
            lists.fetch();
        },

        showList: function(id) {
        },

        show404: function() {
        }
    });

    return Router;

});