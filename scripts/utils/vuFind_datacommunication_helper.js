/**
 * Created by smehmood on 6/2/2015.
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
 * VuFindDataCommunicationHelper class  has the functionality to communicate with VuFind server for data import/export

 */
var VuFindDataCommunicationHelper = (function () {
    return {
        EXPORT_DATA_SOURCE:{SAVEDSEARCH:'Saved Search',FILE:'File'}
       ,exportCSV: function (csvDataObj,source) {
            //TODO: Http Call to VuFind Server for CSV data export
            var requestBody={};
            var vuFindResponse;
            nlapiLogExecution('debug','csvDataObj.category',csvDataObj.category);
            var rec=nlapiCreateRecord('customrecord_vufind_csvdata');
            rec.setFieldValue('name',source);
            requestBody.customer_id=VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_CUSTOMERID;
            requestBody.cat=csvDataObj.category;
            requestBody.file_name=csvDataObj.fileName;
            requestBody.file_data=VuFindBase64.encode(csvDataObj.csvData);
            requestBody.app_key=VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_APPKEY;
            requestBody.token=VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_TOKEN;
            //rec.setFieldValue('custrecord_csvdata',VuFindBase64.encode(csvDataObj.csvData));
            rec.setFieldValue('custrecord_csvdata',JSON.stringify(requestBody) + '  ' + JSON.stringify(VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_HEADERS));

            try {
               //Call to vufind for data upload
               vuFindResponse=nlapiRequestURL(VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_URL, JSON.stringify(requestBody), VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_HEADERS,'POST');
               rec.setFieldValue('custrecord_vufindresponse',vuFindResponse.getBody());
               nlapiLogExecution('debug','Body Saved');
            }
            catch(ex)
            {
                nlapiLogExecution('debug','System Error inside catch block',ex.toString());
                rec.setFieldValue('custrecord_vufindresponse',ex.toString());
            }
            nlapiSubmitRecord(rec);
        }
        ,
        trackCall: function (params) {
            try {
                var responseHeader;
                var vuFindResponse;
                var urlForTrackingCall = VuFindConfigurationSettings.VUFIND_TRACK_CALL_URL;
                urlForTrackingCall = urlForTrackingCall+'?id='+VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_CUSTOMERID;
                urlForTrackingCall = urlForTrackingCall+'&c='+params.category;
                urlForTrackingCall = urlForTrackingCall+'&sku='+params.sku;
                urlForTrackingCall = urlForTrackingCall+'&t='+params.trackType;
                urlForTrackingCall = urlForTrackingCall+'&u='+params.imageURL;
                nlapiLogExecution('debug','urlForTrackingCall',urlForTrackingCall);
                vuFindResponse = nlapiRequestURL(urlForTrackingCall);
                responseHeader = vuFindResponse.getHeader("Request-Id");
                return responseHeader;
            }catch(ex)
            {
                nlapiLogExecution('debug','Error in trackCall',ex.toString());
            }
        }
        ,
        getRecommendations: function (params,recommendationType) {
            try {
                var responseBody;
                var vuFindResponse;
                var urlForRecommendations;

                switch (recommendationType) {
                    case VuFindGetRecommendationHelper.RECOMMENDATION_TYPE.VUMATCH :
                        urlForRecommendations=VuFindConfigurationSettings.VUFIND_GET_RECOMMENDATIONS_URL_VUMATCH;
                        break;
                    case VuFindGetRecommendationHelper.RECOMMENDATION_TYPE.VUSTYLE :
                        urlForRecommendations=VuFindConfigurationSettings.VUFIND_GET_RECOMMENDATIONS_URL_VUSTYLE;
                        break;
                }
                urlForRecommendations = urlForRecommendations+'?customer_id='+VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_CUSTOMERID;
                urlForRecommendations = urlForRecommendations+'&cat='+params.category;
                urlForRecommendations = urlForRecommendations+'&url='+params.imageURL;
                urlForRecommendations = urlForRecommendations+'&app_key='+VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_APPKEY;
                urlForRecommendations = urlForRecommendations+'&token='+VuFindConfigurationSettings.VUFIND_FILE_UPLOAD_ENDPOINT_TOKEN;

                nlapiLogExecution('debug','recommendationType',recommendationType);
                nlapiLogExecution('debug','urlForRecommendations',urlForRecommendations);
                vuFindResponse=nlapiRequestURL(urlForRecommendations);
                responseBody = vuFindResponse.getBody();

                if(responseBody.indexOf('<') > -1 )
                    responseBody = responseBody.substring(0,responseBody.indexOf('<'));
                responseBody=JSON.parse(responseBody);
            }catch(ex)
            {
                nlapiLogExecution('debug','Error in getRecommendations Call',ex.toString());
                responseBody = null;
            }
            return responseBody;
        }
    };
})();

