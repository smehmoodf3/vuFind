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
        jQuery.ajax({
            type: "POST",
            url: clickTrackURL,
            data: JSON.stringify(postDataArray),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    }
    //clear local storage
    window.localStorage.setItem('VuFindItemsInCart', null);
    window.localStorage.setItem('vuFindClickedItem', null);


})(jQuery);

