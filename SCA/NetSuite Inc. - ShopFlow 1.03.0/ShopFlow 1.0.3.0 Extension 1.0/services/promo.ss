// promo.ss
// ----------------
// Service to get promotions data

// Suitelet internal id
var scriptInternalId = 1061;

// Company id
var companyId = nlapiGetContext().company;

// hash
var hash_code = 'bd7bf9cfc9ab8f48dac3';

// Suitelet public url
var suiteletPublicUrl = 'https://forms.na1.netsuite.com/app/site/hosting/scriptlet.nl?script='+ scriptInternalId +'&deploy=1&compid=' + companyId + '&h=' + hash_code;

function service(request,response) { 
	
	var scriptInternalId = 1067;
	var responseJSON = nlapiRequestURL(suiteletPublicUrl);
	responseJSON = responseJSON .getBody();
	// some times the webservice returns a comment of it own , to counter this we add a check
	if ( responseJSON .indexOf('<!--') == -1 ) 
		response.write(responseJSON );
	else 
		response.write(responseJSON .substring(0,responseJSON .indexOf('<!--')));
}
