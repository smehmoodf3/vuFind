// WishList.Model.js
// -----------------------
// View Model for user's wishlist
define('WishList.Model', ['ItemDetails'], function (ItemDetails)
{
    'use strict';

    return Backbone.Model.extend({
            urlRoot: _.getAbsoluteUrl('services/wishlist_service.ss')
        ,	parse: function (record)
        {
            console.log("Wishlist.model");
            if ( record.item )
            {
                record.id = record.wishlistRecordId;
                record.internalid = record.item.internalid;
                record.item = new ItemDetails.Model(record.item);

            }
            return record;
        }
        });
});