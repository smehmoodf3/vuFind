/**
 * Created by smehmood on 5/29/2015.
 * TODO:
 * -
 * Referenced By:
 * -
 * -
 * Dependencies:
 * -
 * -
 */

/**
 * VuFindExportSavedSearchSuit class that has the actual functionality of suitelet.
 * All business logic will be encapsulated in this class.
 */
var VuFindExportSavedSearchSuit = (function () {
    return {
        /**
         * main method
         */
        main: function (request, response) {
            var responseContent;
            if(request.getMethod() === 'GET')
            {
                responseContent=VuFindExportSavedSearchHelper.getForm(request);
                response.writePage(responseContent);
            }else if(request.getMethod() === 'POST')
            {
                responseContent=VuFindExportSavedSearchHelper.processPostCall(request);
                response.write(JSON.stringify(responseContent));
            }
        }
    };
})();

/**
 * This is the main entry point for VuFindExportSavedSearchSuit suitelet
 * NetSuite must only know about this function.
 * Make sure that the name of this function remains unique across the project.
 */
function VuFindExportSavedSearchSuitSuiteletMain(request, response) {
    return VuFindExportSavedSearchSuit.main(request, response);
}