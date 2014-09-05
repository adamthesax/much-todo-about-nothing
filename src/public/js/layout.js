'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette'
], function ($, _, Backbone)  {

    var Layout = Marionette.Layout.extend({
        el: 'body',

        regions: {
            content: "#content",
            sidebar: "#sidebar"
        }
    });

    return new Layout();
});
