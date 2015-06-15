function main() {

    // Fetch Todays Date
    var d = new Date();
    var todaysDate = (parseInt(d.getMonth()) + 1) + '/' + d.getDate() + '/' + d.getFullYear()

    // Searching 
    var col = new nlobjSearchColumn('enddate');
    col.setSort();
    var searchResult = nlapiSearchRecord('promotioncode', '', [new nlobjSearchFilter('enddate', '', 'onorafter', todaysDate), new nlobjSearchFilter('isinactive', '', 'is', 'F')], col);

	// Object that will be sent
    var returnObj = [];
    if (!!searchResult) {
        var l = searchResult.length;
        // handling the 3 restriction
		if (l >= 3) l = 3;
        for (var i = 0; i < l; i++) {
			
			// Make and Push in Obj Array
            var rec = nlapiLoadRecord('promotioncode', searchResult[i].getId());
            var name = rec.getFieldValue('name');
            var desc = rec.getFieldValue('description');
            var image = (!!rec.getFieldText('custrecord_img')) ? rec.getFieldText('custrecord_img') : 'promo.jpg';
            returnObj.push({
                'name': name,
                'desc': desc,
                'image': image
            });
        }
    }

    response.write(JSON.stringify(returnObj));
}