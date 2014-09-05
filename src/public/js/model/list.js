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
            items: new Backbone.Collection(new ListItemModel())
        },

        autosave: function() {
            this.trigger("autosave:start");
            this.save(this.attributes, {
                success: $.proxy(function(model, response){
                    this.trigger("autosave:success");
                }, this),
                error: $.proxy(function(model, response){
                    this.trigger("autosave:failure");
                }, this),
                parse: false
            });
        },

        initialize: function(options) {
           this.on("change:name", this.autosave, this);
            if (this.has("items")) {
                this.get("items").on("remove change", this.autosave, this);
            }
        },


        parse: function(response, options) {
            if (options && !options.parse) return;

            this.set("items", new Backbone.Collection(response.items));
            this.get("items").on("remove change", this.autosave, this);
            delete response.items;

            return response;
        }
    })

    return List;

});