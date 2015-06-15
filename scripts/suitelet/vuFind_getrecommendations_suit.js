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
            var itemRecordInformation;
            var category;

            if (request.getMethod() === "GET") {
                try {
                    storeId = request.getParameter('storeid');
                    storeItemId = request.getParameter('storeitemid');
                    nsDomain = request.getParameter('storedomain');
                    itemRecordInformation = nlapiLookupField('item',storeItemId,['custitem_vufind_imageurl','category','itemid','custitem_vufind_category']);
                    if(!! itemRecordInformation.custitem_vufind_category )
                    {
                        params.category = itemRecordInformation.custitem_vufind_category;
                    }
                    else
                    {
                        category = itemRecordInformation.category;
                        if(!!category) params.category = category.substring(category.lastIndexOf('>') + 1, category.length).trim();
                    }
                    VuFindGetRecommendationHelper.StoreDomain=VuFindGetRecommendationHelper.getDomain(nsDomain);
                    nlapiLogExecution('debug','storeid storeitemid nsdomain',storeId+'   ' + storeItemId + '   ' +nsDomain);
                    params.id = VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_CUSTOMERID;
                    //params.category=request.getParameter('cat');  //Category
                    //TODO: extract category and image url in one nlapilookup call

                    params.imageURL = itemRecordInformation.custitem_vufind_imageurl;
                    params.app_key = VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_APPKEY;
                    params.token = VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_TOKEN;

                    vuFindResponseData = VuFindDataCommunicationHelper.getRecommendations(params,VuFindGetRecommendationHelper.RECOMMENDATION_TYPE.VUMATCH);
                    if( vuFindResponseData === null)
                        throw new Error('Error in getting vumatch recommendation');
                    responseData.recommendations = VuFindGetRecommendationHelper.getClientSideRecommendationData(vuFindResponseData,storeId,VuFindGetRecommendationHelper.RECOMMENDATION_TYPE.VUMATCH);
                    vuFindResponseData = VuFindDataCommunicationHelper.getRecommendations(params,VuFindGetRecommendationHelper.RECOMMENDATION_TYPE.VUSTYLE);
                    if( vuFindResponseData === null)
                        throw new Error('Error in getting vustyle recommendation');
                    responseData.recommendationsVuStyle = VuFindGetRecommendationHelper.getClientSideRecommendationData(vuFindResponseData,storeId,VuFindGetRecommendationHelper.RECOMMENDATION_TYPE.VUSTYLE);
                    responseData.status = 'success';

                } catch (ex) {
                    VuFindCommon.logException("error in getreceomendations suitelet", ex);
                    responseData.status = 'fail';
                    responseData.msg = 'No Recommendations';
                    responseData.errorMsg = ex.toString();
                }
                responseData = 'VuFindTemplatesHelper.vuFindRecommendations(' + JSON.stringify(responseData) + ')';
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