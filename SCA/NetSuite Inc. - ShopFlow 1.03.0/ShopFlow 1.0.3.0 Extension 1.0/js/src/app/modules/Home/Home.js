// AJAX call to getPromos from the .ss file 
function getPromos() {
    try {
        return jQuery.ajax({
            type: "GET",
            url: '/shopflow-1-03-0/services/promo.ss',
            async: false
        }).responseText;
    } catch (ex) {
        return null;
    }
}


define('Home', function() {
    'use strict';

    var View = Backbone.View.extend({

        template: 'home'

        ,
        title: _('Welcome to the store').translate()

        ,
        page_header: _('Welcome to the store').translate()

        ,
        attributes: {
            'id': 'home-page',
            'class': 'home-page'
        }

        ,
        events: {},
        // Binding the afterRender file 
		initialize: function(options) {
            _.bindAll(this, 'beforeRender', 'render', 'afterRender');
            var _this = this;
            this.render = _.wrap(this.render, function(render) {
                _this.beforeRender();
                render();
                _this.afterRender();
                return _this;
            });
        },
        beforeRender: function() {
            console.log('beforeRender');
        },

		
        afterRender: function() {
			
			// Code to trigger courasel
            setTimeout(function() {
                jQuery('.carousel').carousel({
                    interval: 3000,
                    cycle: true
                });

            }, 2000);

        }



    });

    var Router = Backbone.Router.extend({

        routes: {

            '': 'homePage',
            '?*params': 'homePage'
        }

        ,
        initialize: function(Application) {


            this.application = Application;


            setTimeout(function() {
                jQuery('.carousel').carousel({
                    interval: 3000,
                    cycle: true
                });

            }, 2000);




        }

        ,
        homePage: function() {
            var jsonres;
            var res = getPromos();
            if (!!res) jsonres = JSON.parse(res);
            var view = new View({
                application: this.application,
                da: jsonres

            });

            view.showContent();

        }
    });

    return {
        View: View,
        Router: Router,
        mountToApp: function(Application) {
            return new Router(Application);
        }
    };
});