/**
 * Created by smehmood on 5/19/2015.

 /**
 * VuFindExportSavedSearchHelper for exporting saved search result to external server
 *
 */

var VuFindExportSavedSearchHelper = {

    TEMP_CUSTOM_RECORD_ID:'customrecord_savedsearchlist',
    SAVED_SEARCH_STARTS_WITH:'ITEM',            //It should always in Capital Letter
    SAVED_SEARCH_NAMES_FIELD:'custrecord_savedsearch',

    /* Function to show form on get/post requset
     * @param {object} request - http request
     */

    getForm: function(request) {

        var form;
        var savedSearchListFld;
        var savedSearchOptions;
        var savedSearchId;

        if(request.getMethod() === 'GET')
        {
            form=nlapiCreateForm('Upload Data to vuFind');

            savedSearchListFld=form.addField('custpage_savedsearch', 'select', 'Saved Search');

            form.addButton('custpage_upload','Upload by Saved Search','VuFindExportSavedSearchClient.uploadSavedSearch()');
            form.addButton('custpage_uploadbyfile','Upload By File');
            form.setScript('customscript_vufind_exportss_client');

            savedSearchOptions=this.getSavedSearchList();
            this.fillSaveSearchSelectList(savedSearchOptions,savedSearchListFld);

        }
        else if(request.getMethod() === 'POST')
        {

            //TODO : get the id of saved search
             savedSearchId=request.getParameter('custpage_savedsearch');

            //TODO : Generate the csv of saved search
            //TODO : Upload call nlapiRequest URL
            //TODO


        }

        return form;

    }

    ,

    processPostCall:function(request)
    {


        try {

            nlapiLogExecution('debug','call to processPostCall');
            //var savedSearchId = JSON.parse(request.getBody()).savedsearchId;
            var csvData
            var responseContent={};

            //if (!!savedSearchId) {
            //    csvData = SavedSearchResultConverter.convertToCSV(savedSearchId, true);
            //}

            responseContent.status = 'success';
            responseContent.msg = 'CSV GenerateSuccessfully';
            responseContent.data='';

        }catch(ex){
            responseContent.status = 'failed';
            responseContent.msg = 'CSV Not Generate Please Try Againn';
            responseContent.error = 'Error ' + ex.toString();

        }

        return responseContent;

    }
    ,
    /* Function gives list of saved searches , id and name
     */
    getSavedSearchList: function() {

        var searchRec;
        var rec;
        var ssField;
        var savedSearchNames;
        var saveSearchOptions=[];
        var self=this;


            searchRec = nlapiSearchRecord(this.TEMP_CUSTOM_RECORD_ID);

            if (!!searchRec && searchRec.length > 0) {
                rec = nlapiLoadRecord(this.TEMP_CUSTOM_RECORD_ID, searchRec[0].getId());
                ssField = rec.getField(this.SAVED_SEARCH_NAMES_FIELD);
                savedSearchNames = ssField.getSelectOptions();

                savedSearchNames.forEach(function (optionObj)
                {
                    if((optionObj.text.toUpperCase()).indexOf(self.SAVED_SEARCH_STARTS_WITH) === 0)
                    saveSearchOptions.push(optionObj);
                });

            }

        return saveSearchOptions;

    }
    ,

    /* Function fills the savedSearchNames in select field
    /* @param {array} savedSearchOptions array of object , each object has propert id and text
     /* @param {selecObj} selectObj select/combo field object
     */

    fillSaveSearchSelectList: function(savedSearchOptions,selectObj) {

        if(!!savedSearchOptions && savedSearchOptions.length>0 && !!selectObj)
        {

            savedSearchOptions.forEach(function (optionObj)
            {
                selectObj.addSelectOption(optionObj.id,optionObj.text);
            });

        }

    }


};