'use strict';

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var Lists = Backbone.Collection.extend({
        url: '/api/list'
    })

    return Lists;

});