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
            var itemRecordInformation;
            var category;
            var response;

            if (request.getMethod() === "POST") {
                try {
                    if(!!dataReceived && dataReceived.length) {
                        for(var d=0;d<dataReceived.length;d++) {
                            params = {};
                            params.id = VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_CUSTOMERID;
                            //Getting information from item record
                            itemRecordInformation = nlapiLookupField('item',dataReceived[d].internalid,['custitem_vufind_imageurl','category','itemid']);
                            params.sku = itemRecordInformation.itemid;
                            params.trackType = dataReceived[d].t; //t=c: click  t=a: add-to-cart    t=p: purchase
                            category = itemRecordInformation.category;
                            //Getting last part of category
                            params.category = category.substring(category.lastIndexOf('>')+1,category.length).trim();
                            params.imageURL = itemRecordInformation.custitem_vufind_imageurl;
                            nlapiLogExecution('debug','Tracking Call Received',JSON.stringify(params));
                            response = VuFindDataCommunicationHelper.trackCall(params);
                            nlapiLogExecution('debug','Response Request Id',response);
                        }
                    }
                } catch (ex) {
                    nlapiLogExecution('debug',"error in VuFindCallTracking suitelet", ex.toString());
                }
                //response.write(responseData);
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