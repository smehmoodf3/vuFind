/*exported service*/
// wishlist.ss
// ----------------
// Service to manage wishlists requests
function service (request)
{
	'use strict';
	// Application is defined in ssp library commons.js
	try
	{
		
		nlapiLogExecution("DEBUG", "Wishlist service2", request.getBody());
		nlapiLogExecution("DEBUG", "Is logged in2 = " + session.isLoggedIn());
		
		var data = JSON.parse(request.getBody() || '{}');
		
	    //Only can get, modify, update or delete wishlist if you are logged in
		if (session.isLoggedIn() || (!!data.customerId && data.customerId != "0"))
		{
			var method = request.getMethod()
			
			//  Wishlist model is defined on ssp library Models.js
			,	Wishlist = Application.getModel('WishList');

			nlapiLogExecution("DEBUG", "New Wishlist service, method = " + method, JSON.stringify(data));
			
			switch (method)
			{
				case 'POST':
					// Pass the data to the Wishlist's update method and send it response
					var resp = Wishlist.create(data);
					nlapiLogExecution("DEBUG", "Done adding wishlist record");
					Application.sendContent(resp);
				break;

				default: 
					// methodNotAllowedError is defined in ssp library commons.js
					Application.sendError(methodNotAllowedError);
			}
		}
		else
		{
			// unauthorizedError is defined in ssp library commons.js			
			Application.sendError(unauthorizedError);
		}
	}
	catch (e)
	{
	    nlapiLogExecution("ERROR", e.name, e.message);
	    Application.sendError(e);
	}
}