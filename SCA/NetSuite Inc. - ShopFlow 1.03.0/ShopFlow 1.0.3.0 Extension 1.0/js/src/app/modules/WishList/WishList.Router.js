// WishList.Router.js
// -----------------------
// Router for handling WishList view/update
define('WishList.Router',  ['WishList.Views','WishList.Collection'], function (Views, Collection) {

    'use strict';
    return Backbone.Router.extend({

        routes: {
            'wishlist': 'wishlist'
            , 'wishlist?:options': 'wishlist'
        }

        ,	initialize: function ( application )
        {
            this.application = application;
        }

        // load the home page
        ,	wishlist: function (options)
        {
            console.log('In wishlist control');
            options = (options) ? SC.Utils.parseUrlOptions(options) : {page: 1};

            var collection = new Collection(),
                view = new Views.Wishlist({
                    application: this.application
                    ,	page: options.page
                    ,	collection: collection
                });

            collection
                .on('reset', view.showContent, view)
                .fetch({
                    killerId: this.application.killerId
                    ,	reset: true
                    ,   data: options
                });
        }
    });
});
