// WishList.Collection.js
// -----------------------
// Collection of wishlist items
define('WishList.Collection', ['WishList.Model'], function (Model) {
    'use strict';

    return Backbone.Collection.extend({

        url: 'services/wishlist.ss'
        ,	model: Model

        ,	parse: function (response)
        {
            console.log("Wishlist.collection");
            this.totalRecordsFound = response.totalRecordsFound;
            this.recordsPerPage = response.recordsPerPage;

            return response.records;
        }
    });
});