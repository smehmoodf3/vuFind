/**
 * Created by ubaig on 02/26/2015.
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
 * FileHandler class that has the actual functionality of suitelet.
 * All business logic will be encapsulated in this class.
 */
var FileHandler = (function () {

    var addItemsCVSFolderName = "Add Items CSVs";
    var fileExtention = ".csv";
    var separater = ",";
    var identifierInternalId = "upccode";
    /* Haw River: Clean*/
    var inventLoc = "2";
    /**
     * Returns the file contents as an string array separated by new line
     * @param file nlobjFile
     */
    var getFileId = function (guid) {
        try {
            var fileId = null;
            var fils = [];
            fils.push(new nlobjSearchFilter('name', null, 'is', addItemsCVSFolderName));
            fils.push(new nlobjSearchFilter('name', 'file', 'is', guid + fileExtention));
            var cols = [];
            cols.push(new nlobjSearchColumn('internalid', 'file'));
            var recs = nlapiSearchRecord('folder', null, fils, cols);
            if (recs && recs.length > 0) {
                fileId = recs[0].getValue('internalid', 'file');
            }
            return fileId;
        } catch (ex) {
            RedEyeCommon.logException("getFileId", ex);
            throw ex;
        }

    };

    var getFileContents = function (fileId) {
        try {
            var file = nlapiLoadFile(fileId);
            RedEyeCommon.logDebug('contents encoded', file.getValue());
            return file.getValue();
        } catch (ex) {
            RedEyeCommon.logException("getFileContents", ex);
            throw  ex;
        }

    };

    var getContentsArray = function (contents) {
        try {
            return contents.split('\r\n');
        } catch (ex) {
            RedEyeCommon.logException("getContentsArray", ex);
            throw ex;
        }

    };

    /**
     * Get filter expression using identifier
     * @param gbItemSkus {Array}
     * @return {Array}
     */
    var getFilterExpression = function (identifiersArr) {
        var filExp = [];
        var identifierFilExp = [];
        // making filter expression
        var len = identifiersArr.length;

        for (var i = 0; i < len; i++) {
            var identifier = identifiersArr[i];

            identifierFilExp.push([identifierInternalId, 'is', identifier]);
            identifierFilExp.push('OR');
        }

        // remove last unwanted OR
        if (identifierFilExp.length > 0) {
            identifierFilExp.pop();

            filExp.push(identifierFilExp);

            filExp.push('AND');
            filExp.push(["isinactive", "is", "F"]);
            filExp.push('AND');
            filExp.push(["inventorylocation", "anyof", inventLoc]);

        }

        return filExp;
    };

    var getCols = function () {
        var cols = [];
        cols.push(new nlobjSearchColumn('internalid'));
        cols.push(new nlobjSearchColumn('itemid'));
        cols.push(new nlobjSearchColumn(identifierInternalId));
        cols.push(new nlobjSearchColumn("formulanumeric").setFormula("NVL({locationquantityavailable}, 0)"));
        return cols;
    };
    /**
     * Returns the object having itemQty, identifiersAdded and identifiersNotAdded attributes.
     * itemQty is Object having item id and qunatity data
     * identifiersAdded is Object having identifier and quantity data
     * identifiersNotAdded is Object having identifier and quantity data
     * @param identifiersArr
     * @return object
     */
    var getReturnResp = function (identifiersArr, fileData) {
        if (identifiersArr && identifiersArr.length > 0) {
            var len;
            var identifiersFoundArr = [];
            var data = {};
            /* will have item internal id as attribute and qty as value for all the items to be added */
            var itemQtyObj = {};
            var identifiersAddedObj = {};
            var identifiersNotAddedObj = {};
            data.itemQty = {};
            data.identifiersAdded = {};
            data.identifiersNotAdded = {};

            try {
                var filterExp = getFilterExpression(identifiersArr);
                var cols = getCols();
                var recs = nlapiSearchRecord('item', null, filterExp, cols);

                if (recs && recs.length > 0) {
                    len = recs.length;
                    var count = 1;
                    for (var i = 0; i < len; i++) {
                        var identifer = recs[i].getValue(identifierInternalId);
                        var itemInternalId = recs[i].getValue("internalid");
                        var itemName = recs[i].getValue("itemid");
                        /* used to find the identifiers not found */
                        identifiersFoundArr.push(identifer);

                        var qty = parseInt(fileData[identifer]);
                        /* will have item internal id as attribute and qty as value for all the items to be added */
                        itemQtyObj[itemInternalId] = qty;

                        // todo: work on item availavle
                        var locQtyAvail = parseInt(recs[i].getValue(new nlobjSearchColumn("formulanumeric").setFormula("NVL({locationquantityavailable}, 0)")));

                        /* out of stock */
                        if (qty > locQtyAvail) {
                            data.identifiersAdded[itemInternalId] = identifer + " (Item Name:" + itemName + ") * <i>out of stock, only " + locQtyAvail + " available</i>";
                        } else {
                            data.identifiersAdded[itemInternalId] = identifer + " (Item Name:" + itemName + ")";
                        }
                        count += 1;

                    }
                    /*assigning value for return */
                    data.itemQty = itemQtyObj;
                }

                len = identifiersArr.length;
                for (var i = 0; i < len; i++) {
                    if (identifiersFoundArr.indexOf(identifiersArr[i]) >= 0) {
//                        identifiersAddedObj[identifiersArr[i]] = fileData[identifiersArr[i]];
                    } else {
                        identifiersNotAddedObj[identifiersArr[i]] = fileData[identifiersArr[i]];
                    }
                }
                /*assigning value for return */
//                data.identifiersAdded = identifiersAddedObj;
                data.identifiersNotAdded = identifiersNotAddedObj;

            } catch (ex) {
                RedEyeCommon.logException("getReturnResp", ex);
            } finally {
                return data;
            }
        }
    };


    return {
        main: function (request, response) {
            var data = {};
            data.fileId = null;
            data.itemQty = {};
            data.identifiersAdded = {};
            data.identifiersNotAdded = {};

            var guid = request.getParameter("guid");
            RedEyeCommon.logDebug("guid", request.getParameter("guid"));

            try {
                var fileId = getFileId(guid);
            } catch (ex) {
                var fileId = null;
            }

            if (fileId != null) {
                var fileContents;
                try {
                    fileContents = getFileContents(fileId);
                    /* delete the file which is used */
                    nlapiDeleteFile(fileId);
                } catch (ex) {
                    fileContents = "";
                }

                if (!RedEyeCommon.isBlankOrNull(fileContents)) {
                    try {
                        var contentsArr;
                        contentsArr = getContentsArray(fileContents.trim());
                    } catch (ex) {
                        contentsArr = [];
                    }

                    if (contentsArr && contentsArr.length > 0) {
                        RedEyeCommon.logDebug("contents array", contentsArr.toSource());
                        /* identifier eg:- UPC and qty mapping */
                        var fileData = {};
                        /* identifiers array eg:- UPCs */
                        var identifiersArr = [];
                        var len = contentsArr.length;

                        for (var i = 0; i < len; i++) {
                            if (i == 0) continue;
                            /* seprate identifier and quantity */
                            var identifier = contentsArr[i].split(separater)[0];
                            var qty = contentsArr[i].split(separater)[1];
                            fileData[identifier] = qty;
                            identifiersArr.push(identifier);
                        }

                        if (identifiersArr.length > 0) {
                            RedEyeCommon.logDebug("identifiersArr", identifiersArr.toSource());
                            RedEyeCommon.logDebug("fileData", JSON.stringify(fileData));
                            /* overriding the intialized object */
                            data = getReturnResp(identifiersArr, fileData);
                            data.fileId = fileId;
                            RedEyeCommon.logDebug("return data", JSON.stringify(data));
                        }

                    }
                }
            }

            var sendData = 'itemsData(' + JSON.stringify(data) + ')';
            response.write(sendData);
        }

    };
})();

/**
 * This is the main entry point for FileHandler suitelet
 * NetSuite must only know about this function.
 * Make sure that the name of this function remains unique across the project.
 */
function FileHandlerSuiteletMain(request, response) {
    return FileHandler.main(request, response);
}

