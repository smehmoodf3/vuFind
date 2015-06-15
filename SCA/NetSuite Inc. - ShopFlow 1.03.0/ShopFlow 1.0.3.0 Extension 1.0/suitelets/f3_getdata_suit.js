/**
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       04 Sep 2014     zahmed
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response) {
    try {
        if (request.getMethod() == 'POST') {
            var postData = request.getBody();
            nlapiLogExecution('DEBUG', 'postData', postData);
            var data = JSON.parse(postData);
            response.writeLine(NSCustomAPI.getResponse(data['methodName'], data['data']));
        }else{
        	 response.writeLine('GET request is not allowed');
        }
    } catch (ex) {
        logException('suitelet', ex);
        response.writeLine(ex.toString());
    }
}