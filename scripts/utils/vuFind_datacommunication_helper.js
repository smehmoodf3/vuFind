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

        ,exportCSV: function (csvData,source) {

            //TODO: Http Call to VuFind Server for CSV data export

            var rec=nlapiCreateRecord('customrecord_vufind_csvdata');
            rec.setFieldValue('name',source);
            rec.setFieldValue('custrecord_csvdata',csvData);


            nlapiSubmitRecord(rec);

        }


    };
})();

