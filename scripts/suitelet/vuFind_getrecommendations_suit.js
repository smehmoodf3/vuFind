/**
 * Created by shoaib on 05/29/2015.
 */

/**
 * VuFindGetRecommendations class that has the actual functionality of suitelet.
 * All business logic will be encapsulated in this class.
 */
var VuFindGetRecommendations = (function () {
    return {
        /**
         * main method
         */
        main: function (request, response) {

            var recommendationObj={};
            var recommendations;
            var responseData={};

            if (request.getMethod() === "GET") {
                try {

                  //TODO: Call to VuFind for recommendations

                    recommendations=[{imageurl:'/data/abcd','internalid':'15'},{imageurl:'/data/abcd','internalid':'16'},{imageurl:'/data/abcd','internalid':'49'},{imageurl:'/data/abcd','internalid':'48'},{imageurl:'/data/abcd','internalid':'15'},{imageurl:'/data/abcd','internalid':'16'},{imageurl:'/data/abcd','internalid':'49'},{imageurl:'/data/abcd','internalid':'48'}];

                    responseData.recommendations = recommendations;
                    responseData.status='success';

                } catch (ex) {

                    VuFindCommon.logException("error in getreceoomendations suitelet", ex);


                    responseData.status='fail';
                    responseData.msg='No Recommendations';
                    responseData.errorMsg=ex.toString();

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