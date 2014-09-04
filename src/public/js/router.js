'use strict';

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone)  {

    var Router = Backbone.Router.extend({

        initialize: function() {
            Backbone.history.start();
        },

        routes: {
            "" : "index"
        },

        index: function() {
            $("body").html("hello!");
        }

    });

    return Router;

});