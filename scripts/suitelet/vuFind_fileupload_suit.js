/**
 * Created by Administrator on 30/5/2015.
 */
/**
 * Created by shoaib on 05/29/2015.
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
 * VuFindFileUploader class that has the actual functionality of suitelet.
 * All business logic will be encapsulated in this class.
 */
var VuFindFileUploader = (function () {

    var formTitle = "Upload File";
    var fileUploadFldId = "custpage_add_item_csv_file";
    var addItemsCVSFolderName = "Add Items CSVs";
    var fileExtention = ".csv";

    var isAllowedURL = function (url) {
        var isAllowed = false;
        var allowedURLs = ["http://shopping.na1.netsuite.com/s.nl/c.3669980", "https://checkout.na1.netsuite.com/app/center/nlvisitor.nl/c.3669980/",
            "http://shopping.na1.netsuite.com/s.nl?c=3669980", "http://shopping.na1.netsuite.com/redeye"];

        for (var i = 0; i < allowedURLs.length; i++) {
            if (url.indexOf(allowedURLs[i]) >= 0) {
                isAllowed = true;
                break;
            }
        }

        return isAllowed;
    };

    var isIEBrowser = function (userAgent) {
        return userAgent.indexOf('MSIE') >= 0
    };

    var createForm = function (request) {
        var referer = request.getHeader('Referer');
        if(VuFindCommon.isBlankOrNull(referer)){
            referer = "";
        }

        var userAgent = request.getHeader('User-Agent');
        if(VuFindCommon.isBlankOrNull(userAgent)){
            userAgent = "";
        }

        var headers = request.getAllHeaders();
        var output = "";
        for (var i in headers) {
            output += i + ': ' + headers[i] + '\n';
        }
        VuFindCommon.logDebug("all headers", output);
        VuFindCommon.logDebug("referrer", referer);

        //if (isAllowedURL(referer) || isIEBrowser(userAgent)) {
            var fileUploadForm = nlapiCreateForm(formTitle,true);
            var noteFld = fileUploadForm.addField('custpage_note', 'inlinehtml', '');
            noteFld.setLayoutType('normal', 'startcol');
            var sampleCSVFileLink = "https://checkout.na1.netsuite.com/c.3669980/site/catalog/sample_csv_file_to_show.csv";
            var sampleTextFileLink = "https://checkout.na1.netsuite.com/c.3669980/site/catalog/sample_txt_file_to_show.txt";
            noteFld.setDefaultValue("Only CSV and TXT files are supported. See <a href='" + sampleCSVFileLink + "' target='_blank' >Sample CSV File</a>  " +
                "<a href='" + sampleTextFileLink + "' target='_blank' >Sample TXT File</a>");
            noteFld.setDisplaySize(30, 30);
            //noteFld.setDisplayType('disabled');

            //var cssFilePath = "https://system.na1.netsuite.com/c.3669980/site/css/file_upload_window.css";
            //var html = "<link href='" + cssFilePath + "' type='text/css' rel='stylesheet'/>";
            //fileUploadForm.addField("custpage_css_fld", "inlinehtml", "").setDefaultValue(html);

            var fileField = fileUploadForm.addField(fileUploadFldId, 'file', 'Select File');
            fileField.setMandatory(true);

            //fileUploadForm.setScript("customscript_file_upload_sl_cl");
            var guid = request.getParameter("guid");
            //VuFindCommon.logDebug("guid", guid);
            var guidFld = fileUploadForm.addField("custpage_guid", "text");
            guidFld.setDefaultValue(guid);
            guidFld.setDisplayType("hidden");

            //category
            var categoryFld = fileUploadForm.addField("custpage_category", "text");
            categoryFld.setDefaultValue(request.getParameter('custpage_category'));
            categoryFld.setDisplayType("hidden");



        fileUploadForm.setScript("");
            fileUploadForm.addSubmitButton("Upload");
            fileUploadForm.addResetButton();
            return fileUploadForm;
        //} else {
        //    return "Sorry, something went wrong. Please try again";
        //}
    };

    /**
     * Returns the folder record in which to upload the file
     * @param columns nlobjSearchColumn[]
     * @returns {nlobjSearchResult[]}
     */
    var getUploadFolder = function (columns) {
        try {
            return nlapiSearchRecord("folder", null, [new nlobjSearchFilter("name", null, "is", addItemsCVSFolderName)],
                columns);
        } catch (ex) {
            VuFindCommon.logException("getUploadFolder", ex);
            throw ex;
        }

    };
    /**
     * @return {string} internal ID for created folder.
     */

    var createFolder = function () {
        try {
            var folder = nlapiCreateRecord("folder");
            folder.setFieldValue("name", addItemsCVSFolderName);
            return nlapiSubmitRecord(folder, true);

        } catch (ex) {
            VuFindCommon.logException("createFolder", ex);
            throw ex;
        }
    };

    return {
        /**
         * main method
         */
        main: function (request, response) {

            if (request.getMethod() === "GET") {
                try {
                    if (typeof createForm(request) === 'string') {
                        response.writeLine(createForm(request));
                    } else {
                        response.writePage(createForm(request));
                    }

                } catch (ex) {
                    VuFindCommon.logException("upload csv file form", ex);
                }

            } else if (request.getMethod() === 'POST') {

                var folderId = null;
                var uploadFolder = null;

                /* getting folder id if exists */
                try {
                    uploadFolder = getUploadFolder(null);
                } catch (ex) {
                    VuFindCommon.logException("getUploadFolder", ex);
                }

                if (uploadFolder && uploadFolder.length > 0) {
                    folderId = uploadFolder[0].getId();
                }
                /* creating new folder */
                else {
                    try {
                        folderId = createFolder();
                    } catch (ex) {
                        VuFindCommon.logException("createFolder", ex);
                    }
                }


                var file = request.getFile(fileUploadFldId);


                /* EXCEL is returned for the csv file as well */
                if (file.getType() === "CSV" || file.getType() === "PLAINTEXT" || file.getType() === "EXCEL") {
                    /* 10 MB is the maximum supported size by Netsuite*/
                    if (file.getSize() / 1048576 <= 10) {
                        if (folderId !== null) {
                            var guid = request.getParameter("custpage_guid");
                            var category=request.getParameter("custpage_category");

                            file.setFolder(parseInt(folderId));
                            file.setName(guid + fileExtention);
                            var id = nlapiSubmitFile(file);

                            var csvData = nlapiLoadFile(id).getValue();


                            if(!!csvData) {

                                var csvDataObj={};

                                csvDataObj.category=category;
                                csvDataObj.csvData=csvData;

                                nlapiLogExecution('debug','csv data',csvData);

                                VuFindDataCommunicationHelper.exportCSV(csvDataObj,VuFindDataCommunicationHelper.EXPORT_DATA_SOURCE.FILE);
                            }



                            response.write("<script type='text/javascript'>window.close();</script>");
                        } else {
                            response.write("Sorry, something went wrong. Please try again.");
                        }
                    } else {
                        response.write("Error: Max. size for file is 10MB");
                    }

                } else {
                    response.write("Error : Only csv and text files are supported");
                }

            }
        }
    };
})();

/**
 * This is the main entry point for VuFindFileUploader suitelet
 * NetSuite must only know about this function.
 * Make sure that the name of this function remains unique across the project.
 */
function FileUploaderSuiteletMain(request, response) {
    return VuFindFileUploader.main(request, response);
}