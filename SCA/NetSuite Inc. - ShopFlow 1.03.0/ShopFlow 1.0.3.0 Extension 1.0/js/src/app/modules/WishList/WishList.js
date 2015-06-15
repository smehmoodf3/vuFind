// WishList.js
// -----------------
// Defines the WishList module (Collection, Views, Router)
// As the WishList is instanciated in the application (without definining a model)
// the validation is configured here in the mountToApp
define('WishList', ['WishList.Views','WishList.Router','User.Model'], function (Views, Router, UserModel) {

    'use strict';

    return	{

        Views: Views
        ,	Router: Router
        ,	MenuItems: {
                id: 'wishlist'
                ,	name: _('Wish List').translate()
                ,	url: 'wishlist'
                ,	index: 8
            }

        ,	mountToApp: function (application)
        {
            var Layout = application.getLayout();

            application.UserModel = UserModel.extend({
                urlRoot: 'services/wishlist.ss'
            });

            Layout.updateHeader = function()
            {
                if (this.application.getConfig('siteSettings.sitetype') === 'ADVANCED')
                {
                    this.$('.site-header').html(SC.macros.header(this));
                    Layout.updateUI(); //notify the layout we have change its internal DOM
                }
            };

            application.getUser().on('change',function(){
                Layout.updateHeader();
            });

            application.addItemToCartTest = function(postData) {
				console.log("Add item to cart test");
            };
            
            return new Router( application );
        }
    };
});
