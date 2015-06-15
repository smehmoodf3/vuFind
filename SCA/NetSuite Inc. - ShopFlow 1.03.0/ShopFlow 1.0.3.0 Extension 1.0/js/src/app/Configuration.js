// Configuration.js
// ----------------
// All of the applications configurable defaults
(function (application)
{
    'use strict';

    application.Configuration = {};

    _.extend(application.Configuration, {

        // header_macro will show an image with the url you set here
        logoUrl: '/c.TSTDRV1260754/shopflow-1-03-0/js/logo.png'

        // depending on the application we are configuring, used by the NavigationHelper.js
        ,	currentTouchpoint: 'home'
        // list of the applications required modules to be loaded
        // de dependencies to be loaded for each module are handled by
        // [require.js](http://requirejs.org/)
        ,	modules: [
            // ItemDetails should always be the 1st to be added
            // there will be routing problmes if you change it
            ['ItemDetails',  {startRouter: true}]
            ,	'Profile'
            ,	'NavigationHelper'
            ,	'BackToTop'
            ,	['Cart',  {startRouter: true}]
            ,	'Content'
            ,	'Facets'
            ,	'GoogleAnalytics'
            ,	'GoogleUniversalAnalytics'
            ,	'Home'
            ,	'LanguageSupport'
            ,	'MultiCurrencySupport'
            ,	'MultiHostSupport'
            ,	'PromocodeSupport'
            ,	'SiteSearch'
            ,	'SocialSharing'
            ,	'ProductReviews'
            ,	'AjaxRequestsKiller'
            ,	'CookieWarningBanner'
            ,	'ImageNotAvailable'
            ,	'ItemImageGallery'
            ,	'ErrorManagement'
            ,	'Merchandising'
            ,	'Merchandising.Context.DefaultHandlers'
            // ,	['Categories',  {addToNavigationTabs: true}]
            ,	'ProductList'
            ,	'PersonalNote'
        ]

        // Default url for the item list
        ,	defaultSearchUrl: 'search'

        // Search preferences
        ,	searchPrefs:
        {
            // keyword maximum string length - user won't be able to write more than 'maxLength' chars in the search box
            maxLength: 40

            // keyword formatter function will format the text entered by the user in the search box. This default implementation will remove invalid keyword characters like *()+-="
            ,	keywordsFormatter: function (keywords)
        {
            if (keywords === '||')
            {
                return '';
            }

            var anyLocationRegex = /[\(\)\[\]\{\~\}\!\"\:\/]{1}/g // characters that cannot appear at any location
                ,	beginingRegex = /^[\*\-\+]{1}/g // characters that cannot appear at the begining
                ,	replaceWith = ''; // replacement for invalid chars

            return keywords.replace(anyLocationRegex, replaceWith).replace(beginingRegex, replaceWith);
        }
        }

        // flag for showing or not, "add to cart" button in facet views
        ,	addToCartFromFacetsView: false
        // url for the not available image
        ,	imageNotAvailable: _.getAbsoluteUrl('img/no_image_available.jpeg')
        // default macros
        ,	macros: {
            facet: 'facetList'

            ,	itemOptions: {
                // each apply to specific item option types
                selectorByType:
                {
                    select: 'itemDetailsOptionTile'
                    ,	'default': 'itemDetailsOptionText'
                }
                // for rendering selected options in the shopping cart
                ,	selectedByType: {
                    'default': 'shoppingCartOptionDefault'
                }
            }

            ,	itemDetailsImage: 'itemImageGallery'

            // default merchandising zone template
            ,	merchandisingZone: 'merchandisingZone'
        }
        // array of links to be added to the header
        // this can also contain subcategories
        ,	navigationTabs: [
            {
                text: _('Home').translate()
                ,	href: '/'
                ,	data: {
                touchpoint: 'home'
                ,	hashtag: '#'
            }
            }
            ,	{
                text: _('Shop').translate()
                ,	href: '/search'
                ,	data: {
                    touchpoint: 'home'
                    ,	hashtag: '#search'
                }
            }
        ]

        ,	footerNavigation: []

        // Macro to be rendered in the header showing your name and nav links
        // we provide be 'headerProfile' or 'headerSimpleProfile'
        ,	profileMacro: 'headerProfile'

        // settings for the cookie warning message (mandatory for UK stores)
        ,	cookieWarningBanner: {
            closable: true
            ,	saveInCookie: true
            ,	anchorText: _('Learn More').translate()
            ,	message: _('To provide a better shopping experience, our website uses cookies. Continuing use of the site implies consent.').translate()
        }

        // options to be passed when querying the Search API
        ,	searchApiMasterOptions: {

            Facets: {
                include: 'facets'
                ,	fieldset: 'search'
            }

            ,	itemDetails: {
                include: 'facets'
                ,	fieldset: 'details'
            }

            // don't remove, get extended
            ,	merchandisingZone: {}
        }

        // Analytics Settings
        // You need to set up both popertyID and domainName to make the default trackers work
        ,	tracking: {
            // [Google Universal Analytics](https://developers.google.com/analytics/devguides/collection/analyticsjs/)
            googleUniversalAnalytics: {
                propertyID: ''
                ,	domainName: ''
            }
            // [Google Analytics](https://developers.google.com/analytics/devguides/collection/gajs/)
            ,	google: {
                propertyID: ''
                ,	domainName: ''
            }
        }

        // Typeahead Settings
        ,	typeahead: {
            minLength: 3
            ,	maxResults: 8
            ,	macro: 'typeahead'
            ,	sort: 'relevance:asc'
        }

        // setting it to false will search in the current results
        // if on facet list page
        ,	isSearchGlobal: true

        // available values are: goToCart, showMiniCart or showCartConfirmationModal
        ,	addToCartBehavior: 'showCartConfirmationModal'

        ,	homeTemplate: 'home'

        // settings on how each facet should display in the "narrow your results" section. Properties:
        // * name: internationalized facet name,
        // * url: hash fragment that identified the facet in the url
        // * priority: an integer grater than zero indicating for ordering facets editors. Facets with greater priority numbers will appear above others.
        // * macro: name of installed macro that renders the facet editor. Some available macros are facetRange, facetColor
        // * uncollapsible: if true the user won't be able to collapse the facet editor
        // * behavior: can be one of "range", "multi". If "range", a double slider will be showed as the editor. If "multi", multiple facet value selection will be available
        // * titleToken: format for the facet on the document title's when it is selected. Can be a string like "from $(0) to $(1)" for range behaviour or "foo $(0) bar" for others. Also it can be a function that accept the facet object as the one parameter.
        // * titleSeparator: a string separator between facets in the document's title.
        ,	facets: [
            /*{
             id: 'category'
             ,	name: _('Category').translate()
             ,	priority: 10
             ,	behavior: 'hierarchical'
             ,	macro: 'facetCategories'
             ,	uncollapsible: true
             ,	titleToken: '$(0)'
             ,	titleSeparator: ', '
             }
             ,	*/
            {
                id: 'onlinecustomerprice'
                ,	name: _('Price').translate()
                ,	url: 'price'
                ,	priority: 0
                ,	behavior: 'range'
                ,	macro: 'facetRange'
                ,	uncollapsible: true
                ,	titleToken: 'Price $(0) - $(1)'
                ,	titleSeparator: ', '
                ,	parser: function (value)
            {
                return _.formatCurrency(value);
            }
            },
            {
                id : 'cost',
                name : _('Cost').translate(),
                url : 'cost',
                priority : 10,
                behavior : 'range',
                macro : 'facetRange',
                uncollapsible : true,
                titleToken : 'Cost  $(0)',
                titleSeparator : ', ',
                parser : function(value) {
                    return _.formatCurrency(value);
                }
            },
            {
                id : 'custitem_gen_gender',
                name : 'Gender',
                url : 'gender',
                priority : 1,
                behavior : 'single',
                macro : 'facetList',
                uncollapsible : true

            },
            {
                id : 'custitem30',
                name : _('Size').translate(),
                url : 'size',
                priority : 2,
                behavior : 'multi',
                macro : 'facetList',
                uncollapsible : true,
                titleToken : 'Size   $(0)',
                titleSeparator : ', ',
                label : 'Size'

            },
            {
                id : 'custitem31',
                name : _('Color').translate(),
                url : 'color',
                priority : 3,
                behavior : 'multi',
                macro : 'facetList',
                uncollapsible : true,
                titleToken : 'Color   $(0)',
                titleSeparator : ', ',
                label : 'Color'

            },
            {
                id : 'itemtype',
                name : _('Type').translate(),
                url : 'type',
                priority : 6,
                behavior : 'multi',
                macro : 'facetList',
                uncollapsible : true,
                titleToken : 'Type   $(0)',
                titleSeparator : ', ',
                label : 'Type'

            }
        ]
        // This options set the title for the facet browse view.
        ,	defaultSearchTitle: _('Products').translate()
        ,	searchTitlePrefix: _('').translate()
        ,	searchTitleSufix: _('').translate()

        // Limits for the SEO generated links in the facets browser
        // Once the limits are hitted the url is replaced with # in the links
        ,	facetsSeoLimits: {
            // how many facets groups will be indexed
            numberOfFacetsGroups: 2
            // for multi value facet groups how many facets values together
            ,	numberOfFacetsValues: 2
            // Which options will be indexed,
            // if you omit one here, and it's present in the url it will not be indexed
            ,	options: ['page', 'keywords'] // order, page, show, display, keywords
        }

        ,	facetDelimiters: {
            betweenFacetNameAndValue: '/'
            ,	betweenDifferentFacets: '/'
            ,	betweenDifferentFacetsValues: ','
            ,	betweenRangeFacetsValues: 'to'
            ,	betweenFacetsAndOptions: '?'
            ,	betweenOptionNameAndValue: '='
            ,	betweenDifferentOptions: '&'
        }
        // Output example: /brand/GT/style/Race,Street?display=table

        // eg: a different set of delimiters
        /*
         ,	facetDelimiters: {
         ,	betweenFacetNameAndValue: '-'
         ,	betweenDifferentFacets: '/'
         ,	betweenDifferentFacetsValues: '|'
         ,	betweenRangeFacetsValues: '>'
         ,	betweenFacetsAndOptions: '~'
         ,	betweenOptionNameAndValue: '/'
         ,	betweenDifferentOptions: '/'
         }
         */
        // Output example: brand-GT/style-Race|Street~display/table

        // map of image custom image sizes
        // usefull to be customized for smaller screens
        ,	imageSizeMapping: {
            thumbnail: 'thumbnail' // 175 * 175
            ,	main: 'main' // 600 * 600
            ,	tinythumb: 'tinythumb' // 50 * 50
            ,	zoom: 'zoom' // 1200 * 1200
            ,	fullscreen: 'fullscreen' // 1600 * 1600
        }
        // available options for the Results per Page dropdown
        ,	resultsPerPage: [
            {items: 12, name: _('$(0) Items').translate('12')}
            ,	{items: 24, name: _('$(0) Items').translate('24'), isDefault: true}
            ,	{items: 48, name: _('$(0) Items').translate('48')}
        ]
        // available views for the item list by selecting the macros
        ,	itemsDisplayOptions: [
            {id: 'list', name: _('List').translate(), macro: 'itemCellList', columns: 1, icon: 'icon-th-list'}
            ,	{id: 'table', name: _('Table').translate(), macro: 'itemCellTable', columns: 2, icon: 'icon-th-large'}
            ,	{id: 'grid', name: _('Grid').translate(), macro: 'itemCellGrid', columns: 4, icon: 'icon-th', isDefault: true}
            ,       {id: 'columns', name: _('Columns').translate(), macro: 'itemCellColumns', columns: 2, icon: 'icon-th-list'}
        ]
        // available sorting options for the Sort By dropdown
        ,	sortOptions: [
            {id: 'relevance:asc', name: _('Relevance').translate(), isDefault: true}
            ,	{id: 'onlinecustomerprice:asc', name: _('Price, Low to High').translate()}
            ,	{id: 'onlinecustomerprice:desc', name: _('Price, High to Low ').translate()}
        ]

        ,	recentlyViewedItems: {
            useCookie: true
            ,	numberOfItemsDisplayed: 6
        }

        // Settings for displaying each of the item options in the Detailed Page
        // Each of the item options are objects that extend whats comming of the api
        // This options should have (but not limited to) this keys
        // * itemOptionId: The id of an option in the item
        // * cartOptionId: The id of an option in the cart (!required, is the primary key for the mapping)
        // * label: The label that the option will be shown
        // * url: the key of the option when its stored in the url
        // * macros: An object that contains
        //    * selector: Macro that will be rendered for selecting the options (Item list and PDP)
        //    * selected: Macro that will be rendered for the item in the cart (Cart and Cart confirmation)
        // * showSelectorInList: if true the selector will be rendered in the item list
        // Be aware that some marcos may require you to configure some exrta options in order to work properly:
        // * colors: an map of the label of the color as they key and hexa or an object as the value is required by the itemDetailsOptionColor
        // We have provided some macros for you to use but you are encouraged to create your own:
        // For the selector we have created:
        // * itemDetailsOptionColor
        // * itemDetailsOptionDropdown
        // * itemDetailsOptionRadio
        // * itemDetailsOptionText
        // * itemDetailsOptionTile
        // and for the selected we have created:
        // * shoppingCartOptionDefault
        // * shoppingCartOptionColor
        ,	itemOptions: [
            // Here are some examples:
            // configure a color option to use color macro
            //	{
            //	,	cartOptionId: 'custcol_color_option'
            //	,	label: 'Color'
            //	,	url: 'color'
            //	,	colors: {
            //			'Red': 'red'
            //		,	'Black': { type: 'image', src: 'img/black.gif', width: 22, height: 22 }
            //		}
            //	,	macros: {
            //			selector: 'itemDetailsOptionColor'
            //		,	selected: 'shoppingCartOptionColor'
            //		}
            //	}
            //
            // configure Gift Certificates options to change the value on the url
            // when the user is filling the values
            //	{
            //		cartOptionId: 'GIFTCERTFROM'
            //	,	url: 'from'
            //	}
            // ,	{
            //		cartOptionId: 'GIFTCERTRECIPIENTNAME'
            //	,	url: 'to'
            //	}
            // ,	{
            //		cartOptionId: 'GIFTCERTRECIPIENTEMAIL'
            //	,	url: 'to-email'
            //	}
            // ,	{
            //		cartOptionId: 'GIFTCERTMESSAGE'
            //	,	url: 'message'
            //	}
        ]

        // for multi images, option that determines the id of the option
        // that handles the image change. eg: custcol_color
        ,	multiImageOption: ''
        // details fields to be displayed on a stacked list on the PDP
        ,	itemDetails: [
            {
                name: _('Details').translate()
                ,	contentFromKey: 'storedetaileddescription'
                ,	opened: true
                ,	itemprop: 'description'
            }
        ]

        // This object will be merged with specific pagination settings for each of the pagination calls
        // You can use it here to toggle settings for all pagination components
        // For information on the valid options check the pagination_macro.txt
        ,	defaultPaginationSettings: {
            showPageList: true
            ,	pagesToShow: 9
            ,	showPageIndicator: false
        }

        // Product Reviews Configuration
        // -----------------------------
        ,	productReviews: {
            maxRate: 5
            ,	computeOverall: true
            ,	reviewMacro: 'showReview'
            ,	loginRequired: false
            ,	filterOptions: [
                {id: 'all', name: _('All Reviews').translate(), params: {}, isDefault: true}
                ,	{id: '5star', name: _('$(0) Star Reviews').translate('5'), params: {rating: 5}}
                ,	{id: '4star', name: _('$(0) Star Reviews').translate('4'), params: {rating: 4}}
                ,	{id: '3star', name: _('$(0) Star Reviews').translate('3'), params: {rating: 3}}
                ,	{id: '2star', name: _('$(0) Star Reviews').translate('2'), params: {rating: 2}}
                ,	{id: '1star', name: _('$(0) Star Reviews').translate('1'), params: {rating: 1}}
            ]
            ,	sortOptions: [
                {id: 'recent', name: _('Most Recent').translate(), params: {order: 'created_on:DESC'}, isDefault: true}
                ,	{id: 'oldest', name: _('Oldest').translate(), params: {order: 'created_on:ASC'}}
                ,	{id: 'best', name: _('Better Rated').translate(), params: {order: 'rating:DESC'}}
                ,	{id: 'worst', name: _('Worst Rated').translate(), params: {order: 'rating:ASC'}}
            ]
        }


    });

    // Search API Environment variables
    // -------------------------------
    var search_api_environment = {};

    // Locale
    if (SC.ENVIRONMENT.currentLanguage)
    {
        var locale = SC.ENVIRONMENT.currentLanguage.locale;

        if (~locale.indexOf('_'))
        {
            var locale_tokens = locale.split('_');
            search_api_environment.language = locale_tokens[0];
            search_api_environment.country = locale_tokens[1];
        }
        else
        {
            search_api_environment.language = locale;
        }
    }

    // Currency
    if (SC.ENVIRONMENT.currentCurrency)
    {
        search_api_environment.currency = SC.ENVIRONMENT.currentCurrency.code;
    }
    // no cache
    if (_.parseUrlOptions(location.search).nocache && _.parseUrlOptions(location.search).nocache === 'T')
    {
        search_api_environment.nocache = 'T';
    }

    // Price Level
    search_api_environment.pricelevel = SC.ENVIRONMENT.currentPriceLevel;

    // Mixes the environment in the configuration of the search api
    _.extend(application.Configuration.searchApiMasterOptions.Facets, search_api_environment);
    _.extend(application.Configuration.searchApiMasterOptions.itemDetails, search_api_environment);
    _.extend(application.Configuration.searchApiMasterOptions.merchandisingZone, search_api_environment);

    // Device Specific Settings
    // ------------------------
    // Calculates the width of the device, it will try to use the real screen size.
    var screen_width = window.screen ? window.screen.availWidth : window.outerWidth || window.innerWidth;

    // Phone Specific
    if (screen_width < 768)
    {
        _.extend(application.Configuration, {

            itemsDisplayOptions: [{
                id: 'table'
                ,	name: _('Table').translate()
                ,	macro: 'itemCellTable'
                ,	columns: 2
                ,	icon: 'icon-th-large'
                ,	isDefault: true
            }]

            ,	sortOptions: [{
                id: 'relevance:asc'
                ,	name: _('Relevance').translate()
                ,	isDefault: true
            }]

            ,	defaultPaginationSettings: {
                showPageList: false
                ,	pagesToShow: 4
                ,	showPageIndicator: true
            }
        });
    }
    // Tablet Specific
    else if (screen_width >= 768 && screen_width < 980)
    {
        _.extend(application.Configuration, {

            itemsDisplayOptions: [
                {id: 'list', name: _('List').translate(), macro: 'itemCellList', columns: 1, icon: 'icon-th-list' , isDefault: true}
                ,	{id: 'table', name: _('Table').translate(), macro: 'itemCellTable', columns: 2, icon: 'icon-th-large'}
            ]

            ,	sortOptions: [
                {id: 'relevance:asc', name: _('Relevance').translate(), isDefault: true}
                ,	{id: 'onlinecustomerprice:asc', name: _('Price, Low to High').translate()}
                ,	{id: 'onlinecustomerprice:desc', name: _('Price, High to Low ').translate()}
            ]

            ,	defaultPaginationSettings: {
                showPageList: true
                ,	pagesToShow: 4
                ,	showPageIndicator: false
            }
        });
    }


    /**
     * SEO related configuration
     * Search Engine Optimization
     */
    var seo_title = function (layout)
        {
            return layout.currentView && layout.currentView.title ? layout.currentView.title : '';
        }

        ,	seo_url = function ()
        {
            return window.location.protocol + '//' + window.location.hostname + '/' + Backbone.history.fragment;
        }

        ,	seo_type = function ()
        {
            return 'product';
        }

        ,	seo_domain = function (layout)
        {
            return layout.application.getConfig('siteSettings.touchpoints.home');
        }

        ,	seo_image =  function (layout)
        {
            var $social_image = layout.$('[data-type="social-image"], [itemprop="image"]');

            return $social_image.length ? $social_image.get(0).src : application.Configuration.imageNotAvailable;
        }

        ,	seo_site_name = function ()
        {
            return SC.ENVIRONMENT.siteSettings.displayname;
        }

        ,	seo_description = function (layout)
        {
            var social_description = layout.$('[data-type="social-description"], [itemprop="description"]').first().text();
            social_description = jQuery.trim( social_description ).replace(/\s+/g, ' ');

            return social_description.length ? social_description : '';
        }

        ,	seo_twitter_description = function (layout)
        {
            var str = seo_description(layout) + '';

            // Twitter cards requires a description less than 200 characters
            return str.substring(0, 197) + '...';
        }

        ,	seo_provider_name = function ()
        {
            return SC.ENVIRONMENT.siteSettings.displayname;
        }

        ,	seo_price = function (layout)
        {
            var price = layout.$('[itemprop="price"]').first().text();
            price = jQuery.trim( price );

            return price.length ? price : '';
        }

        ,	seo_price_standard_amount = function (layout)
        {
            var the_num = seo_price(layout);

            return the_num && the_num.length ? the_num.replace( /^\D+/g, '') : '';
        }

        ,	seo_price_currency = function (layout)
        {
            var price_currency = layout.$('[itemprop="priceCurrency"]').attr('content');
            price_currency = jQuery.trim( price_currency );

            return price_currency.length ? price_currency : '';
        }

        ,	seo_availability = function (layout)
        {
            var $availability_href = layout.$('[itemprop="availability"]')
                ,	result = ''
                ,	param = '';

            $availability_href = jQuery.trim( $availability_href.attr('href') );

            result= $availability_href.split('/');
            param = result[result.length - 1];

            return param.length ? param : undefined;
        }

        ,	seo_twitter_site = function ()
        {
            return '@YourAthleticSho';
        }

        ,	seo_twitter_creator = function ()
        {
            return '@fedmun';
        }

        ,	seo_twitter_lavel_one = function ()
        {
            return 'PRICE';
        }

        ,	seo_twitter_price = function (layout)
        {
            return jQuery.trim( seo_price(layout) + ' ' + seo_price_currency(layout) );
        }

        ,	seo_twitter_lavel_two = function	()
        {
            return 'AVAILABILITY';
        }
        ;

    _.extend(application.Configuration, {

        metaTagMapping: {
            // [Open Graph](http://ogp.me/)
            'og:title': seo_title

            ,	'og:type': seo_type

            ,	'og:url': seo_url

            ,	'og:image': seo_image

            ,	'og:site_name': seo_site_name

            ,	'og:description': seo_description

            ,	'og:provider_name': seo_provider_name

            ,	'og:price:standard_amount': seo_price_standard_amount

            ,	'og:price:currency': seo_price_currency

            ,	'og:availability': seo_availability

            // [Twitter Product Card](https://dev.twitter.com/docs/cards/types/product-card)
            ,	'twitter:card': seo_type

            ,	'twitter:site': seo_twitter_site

            ,	'twitter:creator': seo_twitter_creator

            ,	'twitter:title': seo_title

            ,	'twitter:description': seo_twitter_description

            ,	'twitter:image:src': seo_image

            ,	'twitter:domain': seo_domain

            ,	'twitter:data1': seo_twitter_price

            ,	'twitter:label1': seo_twitter_lavel_one

            ,	'twitter:data2': seo_availability

            ,	'twitter:label2': seo_twitter_lavel_two
        }

        // Social Sharing Services
        // -----------------------
        // Setup for Social Sharing
        ,	socialSharingIconsMacro: 'socialSharingIcons'

        // hover_pin_it_buttons
        ,	hover_pin_it_button: {
            enable_pin_it_hover: true
            ,	enable_pin_it_button: true
            ,	image_size: 'main' // Select resize id to show on Pintrest
            ,	popupOptions: {
                status: 'no'
                ,	resizable: 'yes'
                ,	scrollbars: 'yes'
                ,	personalbar: 'no'
                ,	directories: 'no'
                ,	location: 'no'
                ,	toolbar: 'no'
                ,	menubar: 'no'
                ,	width: '680'
                ,	height: '300'
                ,	left: '0'
                ,	top: '0'
            }
        }

        // Pinterest
        ,	pinterest: {
            enable: false
            ,	popupOptions: {
                status: 'no'
                ,	resizable: 'yes'
                ,	scrollbars: 'yes'
                ,	personalbar: 'no'
                ,	directories: 'no'
                ,	location: 'no'
                ,	toolbar: 'no'
                ,	menubar: 'no'
                ,	width: '632'
                ,	height: '270'
                ,	left: '0'
                ,	top: '0'
            }
        }

        ,	facebook: {
            enable: true
            ,	appId: '237518639652564'
            ,	pluginOptions: {
                'send': 'false'
                ,	'layout': 'button_count'
                ,	'width': '450'
                ,	'show-faces': 'false'
            }
        }

        // Twitter
        ,	twitter: {
            enable: true
            ,	popupOptions: {
                status: 'no'
                ,	resizable: 'yes'
                ,	scrollbars: 'yes'
                ,	personalbar: 'no'
                ,	directories: 'no'
                ,	location: 'no'
                ,	toolbar: 'no'
                ,	menubar: 'no'
                ,	width: '632'
                ,	height: '250'
                ,	left: '0'
                ,	top: '0'
            }
            ,	via: ''
        }

        ,	googlePlus: {
            enable: true
            ,	popupOptions: {
                menubar: 'no'
                ,	toolbar: 'no'
                ,	resizable: 'yes'
                ,	scrollbars: 'yes'
                ,	height: '600'
                ,	width: '600'
            }
        }

        ,	addThis: {
            enable: true
            ,	pubId: 'ra-50abc2544eed5fa5'
            ,	toolboxClass: 'addthis_default_style addthis_toolbox addthis_button_compact'
            ,	servicesToShow: {
                // pinterest: 'Pinterest'
                facebook: 'Facebook'
                ,	twitter: 'Twitter'
                ,	google_plusone: ''
                // ,	print: _('Print').translate()
                ,	email: _('Email').translate()
                ,	expanded: _('More').translate()
            }

            // http://support.addthis.com/customer/portal/articles/381263-addthis-client-api#configuration-ui
            ,	options: {
                username: ''
                ,	data_track_addressbar: true
                // ,	services_exclude: '',
                // ,	services_compact: '',
                // ,	services_expanded: '',
                // ,	services_custom: '',
                // ,	ui_click: '',
                // ,	ui_delay: '',
                // ,	ui_hover_direction: '',
                // ,	ui_language: '',
                // ,	ui_offset_top: '',
                // ,	ui_offset_left: '',
                // ,	ui_header_color: '',
                // ,	ui_header_background: '',
                // ,	ui_cobrand: '',
                // ,	ui_use_css: '',
                // ,	ui_use_addressbook: '',
                // ,	ui_508_compliant: '',
                // ,	data_track_clickback: '',
                // ,	data_ga_tracker: '',
            }
        }
    });

})(SC.Application('Shopping'));