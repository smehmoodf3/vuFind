// service.ss
// ----------------
// Service to get data
 
 
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
 
/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function service(request, response) {

    if (request.getMethod() == 'POST') {
        
        nlapiLogExecution('DEBUG', 'data', request.getBody());
        var data = request.getBody();

        response.writeLine(nlapiRequestURL(suiteletPublicUrl, data).getBody());
    } else {
        response.writeLine('GET request is not allowed');
    }
}