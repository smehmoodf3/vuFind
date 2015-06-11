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
            var htmlData = '';
            var itemURL;
            var itemImg;
            var itemDesc;
            var itemInternalId;
            var temp;

            if (!!data) {
                recommendations = data.recommendations;
                if (!!recommendations && recommendations.length > 0) {
                    if (recommendations.length) {
                        for (var r = 0; r < recommendations.length; r++) {
                            htmlData = '';
                            itemURL = recommendations[r].itemurl;
                            itemImg = recommendations[r].imageurl;
                            itemDesc = recommendations[r].storedisplayname;
                            itemDetailDesc = recommendations[r].storedescription;
                            htmlData = htmlData + '<a href="' + itemURL + '" class="vuFindClickTrack" data-id="'+recommendations[r].internalid+'"><img src="' + itemImg + '"></a>';
                            htmlData = htmlData + '<br/>  ' + itemDesc;
                            htmlData = htmlData + '<br/>  ' + itemDetailDesc;
                            $('<li/>', {html: htmlData}).appendTo('ul.recommendationsList');
                        }
                    }
                }

                // Starting BxSlider
                $('.recommendationsList').bxSlider({
                    minSlides: 3,
                    maxSlides: 4,
                    slideWidth: 220
                    // ,slideMargin: 10
                    // ,auto:true
                    //,controls:true	//Left Right Button
                    //,pager:true	// Slide Selector .. dots to select slided
                    //,autoStart:false
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
    }

};