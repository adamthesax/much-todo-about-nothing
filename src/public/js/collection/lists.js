'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'model/list'
], function ($, _, Backbone, ListModel) {

    var Lists = Backbone.Collection.extend({
        url: '/api/list',
        model: ListModel
    });

    return Lists;

});