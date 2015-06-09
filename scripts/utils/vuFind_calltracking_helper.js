/**
 * Created by smehmood on 6/5/2015.
 */
/**
 * Created by smehmood on 5/19/2015.

 /**
 * VuFindGetRecommendationHelper is set of utility functions for vufind_getrecommendation_suit suitelet
 *
 */
var VuFindGetRecommendationHelper = {

    StoreId:''
    ,
    StoreDomain:''
    ,
    /* Function to get Item Fields Data
     * @param {array} internalIds - internal ids of items
     * @param {string} websiteId -  website id
     */
    getItemInformations: function(internalIds, websiteId) {

        var cols = [],
            itemsData, itemInfoObjectArray = [],
            itemObj = {},
            foundIds, noItemURLs = [];
        cols.push(new nlobjSearchColumn('itemurl'));
        cols.push(new nlobjSearchColumn('imageurl'));
        cols.push(new nlobjSearchColumn('onlineprice'));
        cols.push(new nlobjSearchColumn('storedisplayname'));
        cols.push(new nlobjSearchColumn('storedescription'));

        //Find Items having Website is equal to parameter websiteId and Parameter internalIds
        itemsData = nlapiSearchRecord('item', null, [new nlobjSearchFilter('internalid', null, 'anyof', internalIds), new nlobjSearchFilter('website', null, 'anyof', websiteId)], cols);
        //Is Items Found
        itemInfoObjectArray = this.getItemInfoObjectArray(itemsData);
        noItemURLs = _.difference(internalIds, _.pluck(itemInfoObjectArray, 'internalid'));

        //Find Items having Website @None@, and Parameter internalIds, 1 is hard coded because netsuite always give 1 to primary web store
        if (websiteId === '1' && !!noItemURLs && noItemURLs.length > 0) {
            //Find Items having no Website
            itemsData = nlapiSearchRecord('item', null, [new nlobjSearchFilter('internalid', null, 'anyof', noItemURLs), new nlobjSearchFilter('website', null, 'anyof', '@NONE@')], cols);
            itemInfoObjectArray = itemInfoObjectArray.concat(this.getItemInfoObjectArray(itemsData));
        }
        return itemInfoObjectArray;
    },

    /* Function to create objects from netsuite records array
     * @param {boolean} returnNullUrlIds - if true then it will store the InternalIds of Items for which Url is null
     */
    getItemInfoObjectArray: function(itemsData) {
        var noItemURLs = [];
        var resultArray = [];
        var itemObj;
        var imageURL;

        if (!!itemsData && itemsData.length > 0) {
            for (var i = 0; i < itemsData.length; i++) {
                if (!!itemsData[i].getValue('itemurl')) {
                    itemObj = {};
                    itemObj.itemurl = itemsData[i].getValue('itemurl');
                    imageURL=itemsData[i].getValue('imageurl');
                    //concat domain if not exist
                    if(!! imageURL && imageURL.indexOf('http') === -1)
                    itemObj.imageurl = this.StoreDomain+imageURL;
                    else
                    itemObj.imageurl = imageURL;
                    itemObj.onlineprice = itemsData[i].getValue('onlineprice');
                    itemObj.storedisplayname = itemsData[i].getValue('storedisplayname');
                    itemObj.storedescription = itemsData[i].getValue('storedescription');
                    itemObj.internalid = itemsData[i].getId();
                    resultArray.push(itemObj);
                }
            }
        }
        return resultArray;
    },
    /* Function to get domain form images path
     * @param {string} storeDomain - domain received from webstore
     */
    getDomain: function(storeDomain) {

        if (!!storeDomain && storeDomain.indexOf('na1')>-1) {
            return 'https://system.na1.netsuite.com';
        } else {
            return 'https://system.netsuite.com';
        }

        return resultArray;
    }
};