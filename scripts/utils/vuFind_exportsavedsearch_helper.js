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
        var categoryField;

        if(request.getMethod() === 'GET')
        {
            form=nlapiCreateForm('Upload Data to vuFind');
            //adding fields , buttons, client script
            categoryField=form.addField('custpage_category', 'text', 'Category').setMaxLength(20);
            categoryField.setLayoutType('normal', 'startcol');
            categoryField.setDisplaySize(20, 20);
            savedSearchListFld=form.addField('custpage_savedsearch', 'select', 'Saved Search');
            form.addButton('custpage_upload','Upload by Saved Search','VuFindExportSavedSearchClient.uploadSavedSearch()');
            form.addButton('custpage_uploadbyfile','Upload By File','VuFindExportSavedSearchClient.uploadFile()');
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
            var savedSearchId = JSON.parse(request.getBody()).savedsearchId;
            var savedSearchName=JSON.parse(request.getBody()).savedsearchName;
            var category=JSON.parse(request.getBody()).category;
            var domain=JSON.parse(request.getBody()).domain;

            nlapiLogExecution('debug','savedSearchId',savedSearchId+'   ' + savedSearchName +'   ' + domain);

            var csvDataObject={};
            var responseContent={};
            if (!!savedSearchId) {
                nlapiLogExecution('debug','saved search id found');
                csvData = SavedSearchResultConverter.convertToCSV(savedSearchId, true,domain);
                nlapiLogExecution('debug','csvData After Processing',csvData);
                csvDataObject.category=category;
                csvDataObject.csvData=csvData;
                csvDataObject.fileName=savedSearchName.replace(/\s/g, '')+'_'+VuFindCommon.getRandomKey()+'.csv';
                nlapiLogExecution('debug','csvDataObject.fileName',csvDataObject.fileName);
                VuFindDataCommunicationHelper.exportCSV(csvDataObject,VuFindDataCommunicationHelper.EXPORT_DATA_SOURCE.SAVEDSEARCH);
            }
            responseContent.status = 'success';
            responseContent.msg = 'Data Exported Successfully';
            responseContent.data='';
       }catch(ex){
            responseContent.status = 'failed';
            responseContent.msg = 'There is some problem, please try again';
            responseContent.error = 'Error ' + ex.toString();
            nlapiLogExecution('debug','Error',ex.toString());
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