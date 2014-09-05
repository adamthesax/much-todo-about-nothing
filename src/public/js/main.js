require.config({
    paths: {
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.0/jquery.min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
        marionette: '//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/2.1.0/backbone.marionette',
        bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min'
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'jquery',
                'underscore'
            ],
            exports: 'Backbone'
        },
        marionette: {
            deps: [
                'jquery',
                'underscore',
                'backbone'
            ],
            exports: 'Marionette'
        },
        bootstrap: {
            deps: [
                'jquery'
            ]
        }
    },
    packages: [

    ]
});

require([
    'jquery',
    'underscore',
    'backbone',
    'router'
], function($, _, Backbone, Router, bootstrap){
    new Router();
    Backbone.history.start({pushState: true});
});