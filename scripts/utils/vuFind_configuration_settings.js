/**
 * Created by smehmood on 6/8/2015.
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
 * VuFindConfigurationSettings class that has the configuration settings of VuFind Integration
 */
var VuFindConfigurationSettings = (function () {
    return {
        VUFIND_FILE_UPLOAD_ENDPOINT_URL:'http://node7.vufind.com/api/catalog/upload2'
       ,VUFIND_FILE_UPLOAD_ENDPOINT_HEADERS:{'Content-Type':'application/json','Accept':'application/json'}
       ,VUFIND_FILE_UPLOAD_ENDPOINT_CUSTOMERID:'folio3demo'
       ,VUFIND_FILE_UPLOAD_ENDPOINT_APPKEY:'dee1eb769deb1c7ed850fc2ab18c31e7'
       ,VUFIND_FILE_UPLOAD_ENDPOINT_TOKEN:'3hbv1ionxeoyl9pzsy49e7bl5yh45i830nxuono4vzq309ii80whj9mu022rwge7'
       ,VUFIND_TRACK_CALL_URL:'http://api7.vufind.com/track'
       ,VUFIND_GET_RECOMMENDATIONS_URL_VUMATCH:'http://api9.vufind.com/vumatch/vumatch.php'
       ,VUFIND_GET_RECOMMENDATIONS_URL_VUSTYLE:'http://api9.vufind.com/vumatch/vustyle.php'
    };
})();