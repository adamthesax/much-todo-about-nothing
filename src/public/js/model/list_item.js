'use strict';

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var ListItem = Backbone.Model.extend({
        defaults: {
            value: "",
            checked: false
        }
    })

    return ListItem;

});