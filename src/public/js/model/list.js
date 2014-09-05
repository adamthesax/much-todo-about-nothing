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

        autosave: function() {
            this.trigger("autosave:start");

            if (this.cooldown) clearTimeout(this.cooldown);

            this.cooldown = setTimeout($.proxy(function() {   //calls click event after a certain time
                this.save(this.attributes, {
                    success: $.proxy(function(model, response){
                        this.trigger("autosave:success");
                    }, this),
                    error: $.proxy(function(model, response){
                        this.trigger("autosave:failure");
                    }, this)
                });
                this.cooldown = null;
            }, this), 500);
        },

        initialize: function(options) {
           this.on("change:name", this.autosave, this);
            this.get("items").on("add remove change", this.autosave, this);
        },

        parse: function(response) {
            response.items = new Backbone.Collection(response.items);
            response.items.on("add remove change", this.autosave, this);
            return response;
        }
    })

    return List;

});