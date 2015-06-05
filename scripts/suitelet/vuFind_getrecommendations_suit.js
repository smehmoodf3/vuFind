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

            if (request.getMethod() === "GET") {
                try {
                    storeId = request.getParameter('storeid');
                    storeItemId = request.getParameter('storeitemid');
                    nsDomain= storeItemId = request.getParameter('storedomain');
                    VuFindGetRecommendationHelper.StoreDomain=VuFindGetRecommendationHelper.getDomain(nsDomain);

                    //TODO: Call to VuFind for recommendations

                    vuFindResponseData = [{
                        'internalid': '15'
                    }, {
                        'internalid': '16'
                    }, {
                        'internalid': '49'
                    }, {
                        'internalid': '48'
                    }, {
                        'internalid': '46'
                    }];

                    if (!!vuFindResponseData && vuFindResponseData) {
                        internalIds = _.pluck(vuFindResponseData, 'internalid');

                        if (!!internalIds && internalIds.length > 0) {
                            recommendations = VuFindGetRecommendationHelper.getItemInformations(internalIds, storeId);
                        }
                        responseData.recommendations = recommendations;
                        responseData.status = 'success';
                    }
                } catch (ex) {
                    VuFindCommon.logException("error in getreceoomendations suitelet", ex);
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