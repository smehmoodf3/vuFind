// WishList.Views.js
// -----------------------
// Views for WishList's operations
define('WishList.Views', ['ItemDetails.Model'], function (ItemDetailsModel) {

    'use strict';

    var Views = {};

    // view list of wishlist products
    Views.Wishlist = Backbone.View.extend({
        template: 'wishlist',
        title: _('Wish List').translate(),
        page_header: _('Wish List').translate(),
        attributes: {
            'class': 'OrderListView'
        }

        ,	events: {
            'click [data-action=delete-wishlist-item]': 'deleteWishlistItem'
        }


        // change the view's sorting
        ,	sortByNavigation: function (e)
        {
            Backbone.history.navigate(this.$(e.target).val(), {
                trigger: true
            });

        }

        ,   deleteWishlistItem: function(e)
        {
            var $input = jQuery(e.target)
                ,	item_id = $input.attr('item-id')
                ,   data = {internalid: item_id, customerid: SC.Application('MyAccount').getUser().id};

            this.collection
                .on('reset', view.showContent, view)
                .get(item_id).destroy({
                processData: true, data: JSON.stringify(data), success: function(e,f,g) {
                    console.log("hassan");
                }
            });
            //this.collection.fe
        }

        ,	initialize: function (options)
        {
            this.basePath = 'wishlist/';
            console.log("wishlist.view init");
        }

        ,	showContent: function ()
        {
            //only render when we are actually in reorderitems web page for preventing re-rendering when navigation to other page when reorderitem ajax still loading
            if(Backbone.history.getHash().indexOf('wishlist') === -1)
            {
                return;
            }
            var crumbtrail = [{text: this.title, href: '/wishlist'}];
            /*if (this.options.order_id && this.collection.at(0) && this.collection.at(0).get('order_number'))
            {
                var order_number = this.collection.at(0).get('order_number');
                this.title = _('Reorder Items from Order #$(0)').translate(order_number);
                crumbtrail.push({text: _('Order #$(0)').translate(order_number), href: '/reorderItems/order/' + this.options.order_id});
            }*/
            var dont_scroll = true;
            this.options.application.getLayout().showContent(this, 'wishlist', crumbtrail, dont_scroll);
        }
    });

    return Views;
});
