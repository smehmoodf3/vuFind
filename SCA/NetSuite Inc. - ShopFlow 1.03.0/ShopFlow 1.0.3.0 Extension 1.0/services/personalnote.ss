// personalnote.ss
// ----------------
// Service to manage personal note requests

// Suitelet id
var scriptId = 'customscript_f3_get_data_suit';
// Suitelet deployment id
var scriptDepId = 'customdeploy_f3_get_data_suit';
// Company id
var companyId = nlapiGetContext().company;

// hash
var hash_code = '855201973498ffd79610';

// Suitelet public url
var suiteletPublicUrl = 'https://forms.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=' + scriptId + '&deploy=' + scriptDepId + '&compid=' + companyId + '&h=' + hash_code;

function service (request, response)
{

	'use strict';

	try
	{
		var method = request.getMethod()
        ,	requestedMethod = request.getParameter('requestedmethod')
        ,	id = request.getParameter('internalid')
        ,	data = JSON.parse(request.getBody() || '{}');

        nlapiLogExecution('DEBUG', 'request_method', method);

        switch (method)
        {
            case 'GET':

            break;

            case 'PUT':

            break;

            case 'POST':

                nlapiLogExecution('DEBUG', 'data', JSON.stringify(data));
                response.writeLine(nlapiRequestURL(suiteletPublicUrl, JSON.stringify(data)).getBody());
            break;

            case 'DELETE':

            break;

            default:
                // methodNotAllowedError is defined in ssp library commons.js
                //Application.sendError(methodNotAllowedError);
        }
	}
	catch (e)
	{
	    nlapiLogExecution('ERROR', 'error_occured', e.message);
		//Application.sendError(e);
	}
}

function getAll(siteNumber, customerId){
    var filters = new Array();
    var columns = new Array();

    filters.push(new nlobjSearchFilter('custrecord_ws_item_pn_sitenumber','','is',siteNumber));
    filters.push(new nlobjSearchFilter('custrecord_ws_item_pn_customerid','','is',customerId));

    var col = new nlobjSearchColumn('created');
    col.setSort(true);
    columns.push(col);
    columns.push(new nlobjSearchColumn('internalid'));
    columns.push(new nlobjSearchColumn('custrecord_ws_item_pn_itemid'));
    columns.push(new nlobjSearchColumn('custrecord_ws_item_pn_note'));

    var result = nlapiSearchRecord('customrecord_ws_item_personal_notes',null,filters,columns);
     var arrData = [];
     if (recs && recs.length > 0) {
         cols = recs[0].getAllColumns();
         for (var x = 0;x < recs.length;x++) {
             arrData.push(getPersonalNote(recs[x], cols));
         }
     }

     return arrData;
}

var mapping = {
        internalid : 'internalId'
    ,   created : 'date'
    ,   custrecord_ws_item_pn_itemid : 'itemId'
    ,   custrecord_ws_item_pn_note : 'personalNote'
};

function getPersonalNote (row, cols) {
    var obj = getObject (row, cols, true, mapping);
    obj['itemName'] = row.getText('custrecord_ws_item_pn_itemid');
    return obj;
}

function getObject (row, cols, considerFieldMapping, mappingObject) {
    var obj = null;
    if (row) {
        obj = { id: row.getId() };
        var nm = null;
        for(var x = 0;x < cols.length;x++) {
            if(considerFieldMapping){
                nm = mappingObject[cols[x].getName()];
            }
            else{
                nm = cols[x].getName();
            }
            obj[nm] = row.getValue(cols[x]);
        }
    }
    return obj;
}