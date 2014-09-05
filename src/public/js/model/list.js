'use strict';

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var List = Backbone.Model.extend({
        urlRoot: '/api/list',
        defaults: {
            name: "My New List",
            items: []
        }
    })

    return List;

});