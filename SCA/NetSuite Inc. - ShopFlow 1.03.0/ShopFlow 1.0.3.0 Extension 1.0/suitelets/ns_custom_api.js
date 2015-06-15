/**
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       05 Sep 2014     zahmed
 *
 */

var Constants = {
    wishlistRecord: "customrecord_wishlist",
    wishlistFields: {
        customerId: "custrecord_wl_customer_id",
        siteNum: "custrecord_wl_site_num",
        itemId: "custrecord_wl_itemid"
    }
};

var NSCustomAPI = (function () {
    var functionObj = {

        getProductDetail: function (data) {

            nlapiLogExecution('DEBUG', 'NSCustomAPI.getProductDetail', JSON.stringify(data));

            var productDetail = {
                locations: [],
                aggAvailableStock: 0
            };

            var fieldMapping = {
                'custcol_gen_color': 'custitem31',
                'custcol_gen_size': 'custitem30'
            };

            var itemId = data['itemid'];
            var itemOptions = data['itemOptions'];

            nlapiLogExecution('DEBUG', 'itemOptions', JSON.stringify(itemOptions));

            if (itemId) {
                try {
                    var fils = [];
                    var cols = [];

                    fils.push(new nlobjSearchFilter('parent', null, 'anyof', [itemId]));
                    fils.push(new nlobjSearchFilter('locationquantityonhand', null, 'greaterthan', '0'));

                    // for matrix items
                    if (itemOptions instanceof Object) {
                        for (var i in itemOptions) {
                            if (fieldMapping.hasOwnProperty(i)) {
                                fils.push(new nlobjSearchFilter(fieldMapping[i], null, 'anyof', [itemOptions[i].internalid]));
                            }
                        }
                    }

                    cols.push((new nlobjSearchColumn('inventorylocation')).setSort());
                    cols.push(new nlobjSearchColumn('locationquantityonhand'));

                    var searchResult = nlapiSearchRecord('item', null, fils, cols);

                    if (searchResult && searchResult.length > 0) {
                        nlapiLogExecution('DEBUG', 'searchResult', searchResult.length);
                        searchResult.forEach(function (result) {
                            var location = {};
                            location.name = result.getText('inventorylocation');
                            location.qty = result.getValue('locationquantityonhand');
                            productDetail.locations.push(location);
                            productDetail.aggAvailableStock += parseInt(location.qty);
                        });
                    }
                } catch (ex) {
                    logException('NSCustomAPI.getProductDetail', ex);
                    productDetail.errorMsg = ex.toString();
                }
            }

            return JSON.stringify([productDetail]);
        }

        ,createWishList: function (data) {

            try {
                nlapiLogExecution('DEBUG', 'NSCustomAPI.createWishList', JSON.stringify(data));

                //checking customer and item id
                if (!!data.customerId && data.customerId !== "0" && !!data.modelId) {
                    var recordExists = nlapiSearchRecord(Constants.wishlistRecord, null,
                        [new nlobjSearchFilter(Constants.wishlistFields.customerId, null, "is", data.customerId),
                            new nlobjSearchFilter(Constants.wishlistFields.itemId, null, "is", data.modelId)],
                        new nlobjSearchColumn(Constants.wishlistFields.customerId));

                    if (!recordExists) {
                        var wishlistrow = nlapiCreateRecord(Constants.wishlistRecord);
                        wishlistrow.setFieldValue(Constants.wishlistFields.siteNum, data.siteSettingsId);
                        wishlistrow.setFieldValue(Constants.wishlistFields.customerId, data.customerId);
                        wishlistrow.setFieldValue(Constants.wishlistFields.itemId, data.modelId);
                        var recordId = nlapiSubmitRecord(wishlistrow);
                        return JSON.stringify({status: "0", message: "Item has been added."});
                    } else {
                        return JSON.stringify({status: "1", message: "Item already added."});
                    }
                } else {
                    return JSON.stringify({status: "1", message: "Please log in first."});
                }
            } catch (ex) {
                logException('NSCustomAPI.createWishList', ex);
                return JSON.stringify({status: "2", message: "Some error has occurred. Please try again later."});
            }
        }

        , getAllPersonalNotes: function (data) {
            try {
                var siteNumber = data.sitenumber;
                var customerId = data.customerid;

                var filters = [];
                var columns = [];

                filters.push(new nlobjSearchFilter('custrecord_ws_item_pn_sitenumber', '', 'is', siteNumber));
                filters.push(new nlobjSearchFilter('custrecord_ws_item_pn_customerid', '', 'is', customerId));

                var col = new nlobjSearchColumn('created');
                col.setSort(true);
                columns.push(col);
                columns.push(new nlobjSearchColumn('internalid'));
                columns.push(new nlobjSearchColumn('custrecord_ws_item_pn_itemid'));
                columns.push(new nlobjSearchColumn('custrecord_ws_item_pn_note'));

                var recs = nlapiSearchRecord('customrecord_ws_item_personal_notes',null,filters,columns);
                var arrData = [];
                if (recs && recs.length > 0) {
                    var cols = recs[0].getAllColumns();
                    for (var x = 0;x < recs.length;x++) {
                        arrData.push(getPersonalNote(recs[x], cols));
                    }
                }

                return JSON.stringify(arrData);
            }
            catch (ex){
                logException('NSCustomAPI.getAllPersonalNotes', ex);
            }
        }

        , getPersonalNote: function (data) {
            try {
                var internalId = data.internalid;

                var rec = nlapiLoadRecord('customrecord_ws_item_personal_notes', internalId);

                var personalNote = {
                    internalId : '',
                    date : '',
                    itemId : '',
                    itemName : '',
                    personalNote : ''
                };

                if(rec){
                    personalNote.internalId = rec.getId()
                    personalNote.date = rec.getFieldValue('created');
                    personalNote.itemId = rec.getFieldValue('custrecord_ws_item_pn_itemid');
                    personalNote.itemName = rec.getFieldText('custrecord_ws_item_pn_itemid');
                    personalNote.personalNote = rec.getFieldValue('custrecord_ws_item_pn_note');
                }

                return JSON.stringify(personalNote);
            }
            catch (ex){
                logException('NSCustomAPI.getPersonalNote', ex);
            }
        }

        , deletePersonalNote: function (data) {
            try {
                var internalId = data.internalid;

                nlapiDeleteRecord('customrecord_ws_item_personal_notes', internalId);

                return JSON.stringify({status: 'success'});
            }
            catch (ex){
                logException('NSCustomAPI.deletePersonalNote', ex);
            }
        }

        , updatePersonalNote: function (data) {
            try {
                var internalId = data.internalId;
                var personalNote = data.personalNote;

                nlapiSubmitField('customrecord_ws_item_personal_notes', internalId, 'custrecord_ws_item_pn_note', personalNote);

                return JSON.stringify({status: 'success'});
            }
            catch (ex){
                logException('NSCustomAPI.updatePersonalNote', ex);
            }
        }

        , insertPersonalNote: function (data) {
            try {
                var siteNumber = data.siteNumber;
                var customerId = data.customerId;
                var itemId = data.itemId;
                var personalNote = data.personalNote;

                var pnRecord = nlapiCreateRecord('customrecord_ws_item_personal_notes');
                pnRecord.setFieldValue('custrecord_ws_item_pn_sitenumber',siteNumber);
                pnRecord.setFieldValue('custrecord_ws_item_pn_customerid',customerId);
                pnRecord.setFieldValue('custrecord_ws_item_pn_itemid',itemId);
                pnRecord.setFieldValue('custrecord_ws_item_pn_note',personalNote);
                nlapiSubmitRecord(pnRecord);
                return JSON.stringify({status: 'success'});
            }
            catch (ex){
                logException('NSCustomAPI.insertPersonalNote', ex);
            }
        }
    };

    return{
        getResponse: function (methodName, data) {
            nlapiLogExecution('DEBUG', 'getResponse', 'methodName: ' + methodName + ' data: ' + data);
            if (functionObj.hasOwnProperty(methodName)) {
                nlapiLogExecution('DEBUG', 'getResponse', functionObj[methodName]);

                return functionObj[methodName](data);
            } else {
                return JSON.stringify([
                    {errorMsg: 'Requested method is not defined'}
                ]);
            }
        }
    };

})();


var personalNotesMapping = {
    internalid : 'internalId'
    ,   created : 'date'
    ,   custrecord_ws_item_pn_itemid : 'itemId'
    ,   custrecord_ws_item_pn_note : 'personalNote'
};

function getPersonalNote (row, cols) {
    var obj = getObject (row, cols, true, personalNotesMapping);
    obj['itemName'] = row.getText('custrecord_ws_item_pn_itemid');
    return obj;
}

function getObject(row, cols, considerFieldMapping, mappingObject) {
    var obj = null;
    if (row) {
        obj = { id: row.getId() };
        var nm = null;
        for (var x = 0;x < cols.length;x++) {
            if (considerFieldMapping){
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

function logException(fn, e) {
    var err = '';
    if (e instanceof nlobjError) {
        err = 'System error: ' + e.getCode() + '\n' + e.getDetails();
    }
    else {
        err = 'Unexpected error: ' + e.toString();
    }
    nlapiLogExecution('ERROR', fn, err);
}