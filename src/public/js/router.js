'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'layout'
], function ($, _, Backbone, layout)  {

    var Router = Backbone.Router.extend({

        routes: {
            "" : "index",
            "list/:id" : "showList",
            "*404" : "show404"
        },

        index: function() {
        },

        showList: function(id) {
        },

        show404: function() {
        }
    });

    return Router;

});