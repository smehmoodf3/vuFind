/**
 * Created by shoaib on 05/29/2015.
 */
/**
 * VuFindGetRecommendations class that has the actual functionality of suitelet.
 * All business logic will be encapsulated in this class.
 */
var VuFindGetRecommendations = (function() {
    return {
        /**
         * main method
         */
        main: function(request, response) {
            var recommendationObj = {};
            var recommendations;
            var responseData = {};
            var vuFindResponseData;
            var recommendationObj;
            var internalIds;
            var itemsData;
            var storeId;
            var storeItemId;
            var nsDomain;
            var params={};
            var skusFromVuFind;
            var recommendedItems;

            if (request.getMethod() === "GET") {
                try {
                    storeId = request.getParameter('storeid');
                    storeItemId = request.getParameter('storeitemid');
                    nsDomain = request.getParameter('storedomain');
                    VuFindGetRecommendationHelper.StoreDomain=VuFindGetRecommendationHelper.getDomain(nsDomain);
                    nlapiLogExecution('debug','storeid storeitemid nsdomain',storeId+'   ' + storeItemId + '   ' +nsDomain);
                    params.id = VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_CUSTOMERID;
                    //params.category=request.getParameter('cat');  //Category
                    params.category='men-shoes'; //category
                    params.app_key = VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_APPKEY;
                    params.token = VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_TOKEN;
                    params.imageURL = nlapiLookupField('item',storeItemId,'custitem_vufind_imageurl');
                    vuFindResponseData = VuFindDataCommunicationHelper.getRecommendations(params);
                    skusFromVuFind = VuFindGetRecommendationHelper.extractSkuFromVuFindRecommendations(vuFindResponseData);
                    nlapiLogExecution('debug','skusFromVuFind',JSON.stringify(skusFromVuFind));
                    recommendedItems = VuFindGetRecommendationHelper.getInternalIdsBySku(skusFromVuFind);
                    nlapiLogExecution('debug','recommendedItems',JSON.stringify(recommendedItems));

                    if (!!recommendedItems && recommendedItems) {
                        //internalIds = _.pluck(recommendedItems, 'internalid');
                        internalIds = recommendedItems;
                        if (!!internalIds && internalIds.length > 0) {
                            recommendations = VuFindGetRecommendationHelper.getItemInformations(internalIds, storeId);
                        }
                        responseData.recommendations = recommendations;
                        responseData.status = 'success';
                    }
                } catch (ex) {
                    VuFindCommon.logException("error in getreceomendations suitelet", ex);
                    responseData.status = 'fail';
                    responseData.msg = 'No Recommendations';
                    responseData.errorMsg = ex.toString();
                }
                responseData = 'vuFindRecommendations(' + JSON.stringify(responseData) + ')';
                response.write(responseData);
            }
        }
    };
})();

/**
 * This is the main entry point for VuFindGetRecommendations suitelet
 * NetSuite must only know about this function.
 * Make sure that the name of this function remains unique across the project.
 */
function vuFindGetRecommendationsSuiteletMain(request, response) {
    return VuFindGetRecommendations.main(request, response);
}