/**
 * Created by shoaib on 05/29/2015.
 */
/**
 * VuFindCallTracking class that has the actual functionality of suitelet.
 * All business logic will be encapsulated in this class.
 */
var VuFindCallTracking = (function() {
    return {
        /**
         * main method
         */
        main: function(request, response) {
            var params={};
            var dataReceived = JSON.parse(request.getBody());
            var itemInformation;

            params.id=VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_CUSTOMERID;
            params.category=request.getParameter('c');  //Category
            params.sku=request.getParameter('sku');     //Unique Item Identifier
            params.trackType=request.getParameter('t'); //t=c: click  t=a: add-to-cart    t=p: purchase
            params.imageURL=request.getParameter('u'); //Image URL

            if (request.getMethod() === "GET") {
                try {
                    if(!!dataReceived && dataReceived.length) {
                        for(var d=0;d<dataReceived.length;d++) {
                            params = {};
                            params.id = VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_CUSTOMERID;
                            params.sku = dataReceived[d].internalid;
                            params.trackType = dataReceived[d].t; //t=c: click  t=a: add-to-cart    t=p: purchase
                            params.category = nlapiLookupField('item',params.sku,['itemurl','category']);
                            params.imageURL = request.getParameter('u'); //Image URL
                            VuFindDataCommunicationHelper.trackCall(params);
                        }
                    }
                } catch (ex) {
                    VuFindCommon.logException("error in VuFindCallTracking suitelet", ex);
                    responseData.status = 'fail';
                    responseData.msg = 'Not Tracked';
                    responseData.errorMsg = ex.toString();
                }
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
function vuFindCallTrackingSuiteletMain(request, response) {
    return VuFindCallTracking.main(request, response);
}