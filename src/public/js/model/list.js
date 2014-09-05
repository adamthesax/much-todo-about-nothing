'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'model/list_item'
], function ($, _, Backbone, ListItemModel) {

    var List = Backbone.Model.extend({
        urlRoot: '/api/list',
        defaults: {
            name: "My New List",
            items: new Backbone.Collection([new ListItemModel()])
        },

        events: {
            "change" : "autosave"
        },

        autosave: function() {
            this.trigger("autosave:start");
            this.save(this.attributes, {
                success: $.proxy(function(model, response){
                    this.trigger("autosave:complete");
                }, this),
                error: $.proxy(function(model, response){
                    this.trigger("autosave:failure");
                }, this)
            });
        },

        parse: function(response) {
            response.items = new Backbone.Collection(response.items);
            response.items.on("change", this.autosave, this);
            return response;
        }
    })

    return List;

});