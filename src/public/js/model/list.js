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
            name: "Untitled List",
            items: new Backbone.Collection()
        },

        autosave: function(a, b, c) {
            this.trigger("autosave:start");
            this.save(this.attributes, {
                success: $.proxy(function(model, response){
                    this.trigger("autosave:success");
                }, this),
                error: $.proxy(function(model, response){
                    this.trigger("autosave:failure");
                }, this)
            });
        },

        initialize: function(options) {
           this.on("change:name", this.autosave, this);
            if (this.has("items")) {
                this.get("items").on("remove change", this.autosave, this);
            }
        },


        parse: function(response) {
            // if we don't have items (aka we are parsing without defaults)
            if (!this.has("items")) {
               this.set("items", new Backbone.Collection(response.items));
               this.get("items").on("remove change", this.autosave, this);
            // otherwise if this is the first data set we are getting back
            } else if (this.get("items").length == 0)  {
               // load up the data
               this.get("items").reset(response.items);
            }
            // remove the items from the response for the rest of the chain
            delete response.items;

            return response;
        }
    })

    return List;

});