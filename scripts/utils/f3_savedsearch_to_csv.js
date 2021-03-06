/**
 * Saved Search results to CSV
 * @type {{convertToCSV}}
 *
 * Logic is edited for vufind , this is not generalized logic
 */
var SavedSearchResultConverter = (function () {
    return {
        /**
         * Executes given saved search and converts its result to your separator separated values
         * @param searchId The search to execute
         * @param includeHeader true / false to tell if headers should be included or not
         * @returns {*}
         */
        convertToCSV: function (searchId, includeHeader,domain) {
            var contents = '';
            var searchResult = nlapiSearchRecord(null, searchId, null, null);



            if (!searchResult || searchResult.length <= 0) {
                throw new Error('No result returned after executing search.');
            }

            // Creating some array's that will be populated from the saved search results
            var content = [];
            var temp = [];
            var x = 0;

            if (includeHeader === true) {
                var firstResult = searchResult[0];
                // Returns an array of column internal Ids
                var basicColumns = firstResult.getAllColumns();

                for (var c = 0; c < basicColumns.length; c++) {

                    temp.push(!!basicColumns[c].getLabel()? basicColumns[c].getLabel():basicColumns[c].getName());
                }

                content[x] = temp;
                x++;
            }
            temp = [];
            // Looping through the search Results
            for (var i = 0; i < searchResult.length; i++) {
                var resultSet = searchResult[i];
                // Returns an array of column internal Ids
                var columns = resultSet.getAllColumns();
                var colTitle;

                //console.log(JSON.stringify(columns));

                temp = [];
                // Looping through each column and assign it to the temp array
                for (var y = 0; y < columns.length; y++) {

                    //console.log(columns[y].name+ '     ' + resultSet.getValue(columns[y]));


                    temp[y] = (!!resultSet.getValue(columns[y]) ? resultSet.getValue(columns[y]) : resultSet.getText(columns[y]));

                    colTitle=!!columns[y].getLabel()? columns[y].getLabel():columns[y].getName();

                    nlapiLogExecution('debug','colTitle',colTitle);

                    if(!temp[y])
                        temp[y]="";


                    if(!!temp[y] && !!colTitle && colTitle.toUpperCase() ==='IMAGE-URL' && temp[y].indexOf('http') === -1 )
                    {
                        temp[y]=domain + temp[y];
                    }

                }
                // Taking the content of the temp array and assigning it to the Content Array.
                //console.log('temp : '+temp);
                content[x] = temp;
                x++;

                //break;
            }


            //console.log(content);
            // Looping through the content array and assigning it to the contents string variable.
            for (var z = 0; z < content.length; z++) {
                //console.log('shoaib         ' +    content[z]);

                //contents += content[z].toString() + '\n';

                contents += content[z].map(function(id) {    return '"' + id + '"';   }).join(',').toString() + '\n';

            }

            return contents;
        }
    };
})();