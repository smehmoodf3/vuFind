/**
 * Created by smehmood on 6/11/2015.
 */
/**
 * Created by smehmood on 5/19/2015.

 /**
 * VuFindTemplatesHelper for exporting saved search result to external server
 *
 */
var VuFindTemplatesHelper = {
    /* Function to get Recommendations from site builder item template
     * @param {object} data - JSON object received via suitelet ajax call
     */
    vuFindRecommendations: function (data) {
        (function ($) {
            var recommendations;
            var vuStylerecommendations;
            var htmlData = '';
            var itemURL;
            var itemImg;
            var itemDesc;
            var itemInternalId;
            var temp;
            var itemDetailDesc;


            if (!!data && data.status !== 'fail') {
                recommendations = data.recommendations;
                vuStylerecommendations = data.recommendationsVuStyle;
                console.log('server data' + JSON.stringify(data));
                if (!!recommendations && recommendations.length > 0) {
                    if (recommendations.length) {
                        for (var r = 0; r < recommendations.length; r++) {
                            htmlData = '';
                            itemURL = recommendations[r].itemurl;
                            itemImg = recommendations[r].imageurl;
                            itemDesc = recommendations[r].storedisplayname;
                            itemDetailDesc = recommendations[r].storedescription;
                            try{ if(!!SC.ENVIRONMENT.siteSettings.sitetype)
                                //Call to item Api
                                itemImg = "/c.TSTDRV1260754/shopflow-1-03-0/img/no_image_available.jpeg";
                                itemURL = '';
                            }catch(ex){}

                            htmlData = htmlData + '<a href="' + itemURL + '" class="vuFindClickTrack" data-id="'+recommendations[r].internalid+'"><img src="' + itemImg + '"></a>';
                            htmlData = htmlData + '<br/>  ' + itemDesc;
                            htmlData = htmlData + '<br/>  ' + itemDetailDesc;

                            $('<li/>', {html: htmlData}).appendTo('ul.recommendationsList');

                        }
                    }
                    $('.vumatchheading').show();
                }
                else
                    $('.vufind_f3_bxslider').hide();

                if (!!vuStylerecommendations && vuStylerecommendations.length > 0) {
                    for (var r = 0; r < vuStylerecommendations.length; r++) {
                        htmlData = '';
                        itemURL = vuStylerecommendations[r].itemurl;
                        itemImg = vuStylerecommendations[r].imageurl;
                        itemDesc = vuStylerecommendations[r].storedisplayname;
                        itemDetailDesc = vuStylerecommendations[r].storedescription;
                        try{ if(!!SC.ENVIRONMENT.siteSettings.sitetype) itemImg = "/c.TSTDRV1260754/shopflow-1-03-0/img/no_image_available.jpeg";  }catch(ex){}
                        htmlData = htmlData + '<a href="' + itemURL + '" class="vuFindClickTrackVuStyle" data-id="'+vuStylerecommendations[r].internalid+'"><img src="' + itemImg + '"></a>';
                        htmlData = htmlData + '<br/>  ' + itemDesc;
                        htmlData = htmlData + '<br/>  ' + itemDetailDesc;
                        $('<li/>', {html: htmlData}).appendTo('ul.recommendationsListVuStyle');
                    }
                    $('.vustyleheading').show();
                }
                else
                    $('.vufind_f3_bxslider_vustyle').hide();

                // Starting BxSlider for VuMatch
                $('.recommendationsList').bxSlider({
                    minSlides: 3,
                    maxSlides: 4,
                    slideWidth: 220
                });
                // Starting BxSlider for VuStyle
                $('.recommendationsListVuStyle').bxSlider({
                    minSlides: 3,
                    maxSlides: 4,
                    slideWidth: 220
                });
                //associting click event for call tracking
                VuFindTemplatesHelper.addVuFindClickEvent();
                VuFindTemplatesHelper.addVuFindAddToCartEvent();
            }
        })(jQuery);
        //alert(JSON.stringify(data));
    },
    /* Function to add click event for recommended item click
     */
    addVuFindClickEvent: function () {
        (function ($) {
            $('.vufind_f3_bxslider a.vuFindClickTrack,.vufind_f3_bxslider_vustyle a.vuFindClickTrackVuStyle').click(function() {
                var internalid = $(this).data('id');
                var storeIdElements=$("[name='n']");
                var clickTrackURL;
                var postData = {};
                var postDataArray = [];
                var existingVuFindItemsClicked;
                var vuFindClickedItem;
                var storeDomain = document.location.origin;
                var storeId = 1;

                if (!!storeIdElements && storeIdElements.length > 0) {
                    storeId = storeIdElements[0].value;
                }
                clickTrackURL = "/app/site/hosting/scriptlet.nl?script=customscript_vufind_calltracking_suit&deploy=customdeploy_vufind_calltracking_suit";
                postData.internalid = internalid;
                postData.t = 'c';
                postData.storeId = storeId;
                postDataArray.push(postData);
                //Send Tracking Call to Server
                VuFindTemplatesHelper.sendTrackCallToServer(postDataArray);
            });

        })(jQuery);
    },
    /* Function to add click event add to cart button, it will send tracking for every item for which addtocart will be clicked
     */
    addVuFindAddToCartEvent: function () {
        (function ($) {
            $("#addtocart").click(function (e) {
                var categoryElements = $("[name='category']");
                var itemIdElements = $("[name='itemid']");
                var storeIdElements=$("[name='n']");
                var categoryId;
                var internalid;
                var clickTrackURL;
                var postData = {};
                var postDataArray = [];
                var existingVuFindItemsInCart;
                var existingVuFindItemsClicked;
                var vuFindCartItem;
                var storeDomain = document.location.origin;
                var storeId = 1;

                if (!!storeIdElements && storeIdElements.length > 0) {
                    storeId = storeIdElements[0].value;
                }

                if (!!categoryElements && categoryElements.length > 0) {
                    categoryId = categoryElements[0].value;
                }
                if (!!itemIdElements && itemIdElements.length > 0) {
                    internalid = itemIdElements[0].value;
                }

                    postData.internalid = internalid;
                    postData.t = 'a';
                    postData.storeId = storeId;
                    postDataArray.push(postData);
                    VuFindTemplatesHelper.sendTrackCallToServer(postDataArray);
            });
        })(jQuery);
    },
    /* Function to track purchased item
     */
    addPurchaseEvent: function () {
            (function ($) {
                var clickTrackURL;
                var postData = {};
                var postDataArray = [];
                var storeIdElements = $("[name='n']");
                var storeId = 1;
                var itemsInOrder;
                var itemAttributes;
                var itemsInOrderForVuFound;
                alert('purchase tracking vufind started');
                clickTrackURL = "/app/site/hosting/scriptlet.nl?script=customscript_vufind_calltracking_suit&deploy=customdeploy_vufind_calltracking_suit";
                if (!!storeIdElements && storeIdElements.length > 0) {
                    storeId = storeIdElements[0].value;
                }
                var lineItem = itemsInOrderForVuFound .split("||");
                for (var inum = 0; inum < lineItem.length; inum++) {
                    itemAttributes = lineItem[inum].split("|");
                    console.log(itemAttributes);
                    postData = {};
                    postData.internalid = itemAttributes[0];
                    postData.t = 'p';
                    postData.storeId = storeId;
                    postDataArray.push(postData);
                }

                VuFindTemplatesHelper.sendTrackCallToServer(postDataArray);

                alert('purchase tracking vufind ended');

            })(jQuery);
    },
    /* Function to add click event for recommended item click and store in local storage for management
     */
    addVuFindClickEventManaged: function () {
        (function ($) {
            $('.vufind_f3_bxslider a.vuFindClickTrack').click(function() {
                var internalid = $(this).data('id');
                var storeIdElements=$("[name='n']");
                var clickTrackURL;
                var postData = {};
                var postDataArray = [];
                var existingVuFindItemsClicked;
                var vuFindClickedItem;
                var storeDomain = document.location.origin;
                var storeId = 1;

                if (!!storeIdElements && storeIdElements.length > 0) {
                    storeId = storeIdElements[0].value;
                }
                //Sending call to netsuite suitelet for track call
                clickTrackURL = "/app/site/hosting/scriptlet.nl?script=customscript_vufind_calltracking_suit&deploy=customdeploy_vufind_calltracking_suit";
                postData.internalid = internalid;
                postData.t = 'c';
                postData.storeId = storeId;
                postDataArray.push(postData);
                //Send Tracking Call to Server
                VuFindTemplatesHelper.sendTrackCallToServer(postDataArray);
                //Add to local storage
                existingVuFindItemsClicked = window.localStorage.getItem('vuFindClickedItem');
                if (!!existingVuFindItemsClicked)
                    existingVuFindItemsClicked = JSON.parse(existingVuFindItemsClicked);
                else
                    existingVuFindItemsClicked = [];

                vuFindClickedItem = {};
                vuFindClickedItem.internalid = internalid;
                existingVuFindItemsClicked.push(vuFindClickedItem);
                window.localStorage.setItem('vuFindClickedItem', JSON.stringify(existingVuFindItemsClicked));
            });

        })(jQuery);
    },
    /* Function to add click event add to cart button, it will only add those event for which recommendation is clicked
     */
    addVuFindAddToCartEventManaged: function () {
        (function ($) {
            $("#addtocart").click(function (e) {
                var categoryElements = $("[name='category']");
                var itemIdElements = $("[name='itemid']");
                var storeIdElements=$("[name='n']");
                var categoryId;
                var internalid;
                var clickTrackURL;
                var postData = {};
                var postDataArray = [];
                var existingVuFindItemsInCart;
                var existingVuFindItemsClicked;
                var vuFindCartItem;
                var storeDomain = document.location.origin;
                var storeId = 1;

                if (!!storeIdElements && storeIdElements.length > 0) {
                    storeId = storeIdElements[0].value;
                }
                existingVuFindItemsClicked = window.localStorage.getItem('vuFindClickedItem');
                if (!!existingVuFindItemsClicked)
                    existingVuFindItemsClicked = JSON.parse(existingVuFindItemsClicked);

                if (!!categoryElements && categoryElements.length > 0) {
                    categoryId = categoryElements[0].value;
                }
                if (!!itemIdElements && itemIdElements.length > 0) {
                    internalid = itemIdElements[0].value;
                }
                if (VuFindTemplatesHelper.isExistInList(internalid, existingVuFindItemsClicked)) {
                    postData.internalid = internalid;
                    postData.t = 'a';
                    postData.storeId = storeId;
                    postDataArray.push(postData);
                    VuFindTemplatesHelper.sendTrackCallToServer(postDataArray);
                    //Add to local storage
                    existingVuFindItemsInCart = window.localStorage.getItem('VuFindItemsInCart');

                    if (!!existingVuFindItemsInCart)
                        existingVuFindItemsInCart = JSON.parse(existingVuFindItemsInCart);
                    else
                        existingVuFindItemsInCart = [];
                    vuFindCartItem = {};
                    vuFindCartItem.internalid = internalid;
                    existingVuFindItemsInCart.push(vuFindCartItem);
                    window.localStorage.setItem('VuFindItemsInCart', JSON.stringify(existingVuFindItemsInCart));
                }
            });
        })(jQuery);
    },
    /* Function to sent vufind tracking call , this call will target to our suitelet
     * @param   {array} postDataArray - array holding post data for server
     */
    /* Function to track purchased item
     */
    addPurchaseEventManaged: function () {
        (function ($) {
            var clickTrackURL;
            var postData = {};
            var postDataArray = [];
            var existingVuFindItemsInCart = [];

            clickTrackURL = "/app/site/hosting/scriptlet.nl?script=customscript_vufind_calltracking_suit&deploy=customdeploy_vufind_calltracking_suit";

            existingVuFindItemsInCart = window.localStorage.getItem('VuFindItemsInCart');

            if (!!existingVuFindItemsInCart)
                existingVuFindItemsInCart = JSON.parse(existingVuFindItemsInCart);
            else
                existingVuFindItemsInCart = [];

            if (!!existingVuFindItemsInCart && existingVuFindItemsInCart.length > 0) {
                for (var p = 0; p < existingVuFindItemsInCart.length; p++) {
                    postData = {};
                    postData.internalid = existingVuFindItemsInCart[p].internalid;
                    postData.t = 'p';
                    postDataArray.push(postData);
                }
                VuFindTemplatesHelper.sendTrackCallToServer(postDataArray);
            }
            //clear local storage
            window.localStorage.setItem('VuFindItemsInCart', null);
            window.localStorage.setItem('vuFindClickedItem', null);

        })(jQuery);
    },
    sendTrackCallToServer : function (postDataArray)
    {
        (function ($) {
        var clickTrackURL = "/app/site/hosting/scriptlet.nl?script=customscript_vufind_calltracking_suit&deploy=customdeploy_vufind_calltracking_suit";
            $.ajax({
            type: "POST",
            url: clickTrackURL,
            data: JSON.stringify(postDataArray),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
        })(jQuery);
    }
    ,
    /* Function to check whether given internal id is exist in local storage or not
     * @param   {string} internalId - JSON object received via suitelet ajax call
     * @param {array}  listData - array of existing internalids in local storage
     */
    isExistInList: function (internalId, listData) {
        var exist = false;
        if (!!internalId && !!listData) {
            for (var i = 0; i < listData.length; i++) {
                if (listData[i].internalid.toString() === internalId) {
                    exist = true;
                    break;
                }
            }
        }
        return exist;
    },
    /* Function to check get updated list of internal ids after item removal from cart
     * @param   {string} internalId - item id to be removed from local storage collection
     * @param {array}  listData - array of existing internalids in local storage
     */
    getUpdatedList: function (internalId, listData) {
        var exist = false;
        var updatedList = [];
        if (!!internalId && !!listData) {
            for (var i = 0; i < listData.length; i++) {
                if (listData[i].internalid !== internalId) {
                    updatedList.push(listData[i]);
                }
            }
        }
        return updatedList;
    },
    /* Function to get URL for SCA Store
     * @param   {object} item - item object for which url required
     */
      getSCAItemURL: function(item)
    {

    // If this item is a child of a matrix return the url of the parent
    //if (item.matrixParent) && item.matrixParent.get('internalid'))
    //{
    //	return item.get('_matrixParent').get('_url');
    //}
    // if its a standar version we need to send it to the canonical url
    //else if (SC.ENVIRONMENT.siteType && SC.ENVIRONMENT.siteType === 'STANDARD')
    //{
    //	return item.get('canonicalurl');
    //}

    // Other ways it will use the url component or a default /product/ID
        return item.urlcomponent ? '/'+ item.urlcomponent : '/product/'+ item.internalid;
    },
    /* Function to get Item Data of SCA Store
     * @param   {object} item - item object for which url required
     */
    getSCAItemApiData: function(internalId)
    {
        (function ($) {
            var storeDomain =  SC.ENVIRONMENT.currentHostString;
            var itemApiUrl  =  'http://'+ storeDomain + '/api/items' + '?include=facets&fieldset=search&n=' + SC.ENVIRONMENT.siteSettings.siteid+'&id='+ internalId;
            var resultData;
            $.ajax({
                type: "GET",
                url: itemApiUrl,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async : false,
                success : function(d){ resultData = d; }
            });

            return resultData;

        })(jQuery);
    }
};