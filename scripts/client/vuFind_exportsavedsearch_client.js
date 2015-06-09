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
 * VuFindExportSavedSearchClient class that has the actual functionality of client script.
 * All business logic will be encapsulated in this class.
 */
var VuFindExportSavedSearchClient = (function () {
    return {

        uploadSavedSearch: function () {
            if(!this.validateSavedSearchCall())
            return;

            var addDiv = "<div id='overlay' style='position: fixed;top: 0;left: 0;width: 100%;" + "height: 100%;background-color: #000;filter: alpha(opacity=80);-moz-opacity: 0.8;-khtml-opacity: 0.8;opacity: .8;z-index: 10000;" + " display: none;'>" + "<div class='theText' style='color: #FFFFFF; font-size:20px; font-weight:700;" + " margin-top:15%; margin-left: 40%;'> <br><br>Please Wait....Data Upload to vuFind is in Process...<br><br></div>" + "</div>";
            jQuery('body').append(addDiv);
            jQuery('#overlay').fadeIn();
            var url = nlapiResolveURL('SUITELET', 'customscript_vufind_exportss_suit', 'customdeploy_vufind_exportss_suit');
            var result;
            var postData = {};
            postData.savedsearchId = nlapiGetFieldValue('custpage_savedsearch');
            postData.savedsearchName = nlapiGetFieldText('custpage_savedsearch');
            postData.category= nlapiGetFieldValue('custpage_category');
            postData.domain=document.location.origin;

            jQuery.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(postData),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                timeout: 45000
            }).done(function(d) {
                VuFindExportSavedSearchClient.successFunction(d);
            }).fail(function(jqXHR, textStatus) {
                jQuery('#overlay').fadeOut();
                if (textStatus === 'timeout') {
                    alert('Request timeout');
                } else {
                    alert(textStatus);
                    result = JSON.parse(jqXHR.responseText);
                }
            });

        },

        //Call upon success of ajaz call
        successFunction: function(d) {

            jQuery('#overlay').hide();
            alert(d.msg);
        }
        ,
        //Call to Uplaod File Suitelet
        uploadFile: function () {
            if(!this.validateFileUploadCall())
            return;
            var url = nlapiResolveURL('SUITELET', 'customscript_vufind_fileupload_suit', 'customdeploy_vufind_fileupload_suit')+"&custpage_category="+nlapiGetFieldValue('custpage_category');
            nlOpenWindow(url, 'wizard_popup','width=400,height=320,resizable=yes,scrollbars=no');
        },

        //Validating saved search call related information
        validateSavedSearchCall:function()
        {
            var savedSearchId=nlapiGetFieldValue('custpage_savedsearch');
            var category=nlapiGetFieldValue('custpage_category').trim();
            var validationStatus=true;

            if(!savedSearchId)
            {
                alert('Please choose Saved Search');
                validationStatus=false;
            }
            else if(!category)
            {
                alert('Please enter category');
                validationStatus=false;

            }
            return validationStatus;
        }
        ,
        //Validating File Upload call related information
        validateFileUploadCall:function()
        {
            var category=nlapiGetFieldValue('custpage_category').trim();
            var validationStatus=true;

            if(!category)
            {
                alert('Please enter category');
                validationStatus=false;
            }
            return validationStatus;
        }
    };
})();

