'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette'
], function ($, _, Backbone) {

    var ListItem = Backbone.Marionette.ItemView.extend({
        template: _.template("<%= name %>"), // "script#list-selector-item"
        tagName: "li"
    })

    var ListSelector = Backbone.Marionette.CompositeView.extend({
        template: "script#list-selector",
        itemView: ListItem,
        itemViewContainer: "ul#list-selector-list"
    });

    return ListSelector;
});