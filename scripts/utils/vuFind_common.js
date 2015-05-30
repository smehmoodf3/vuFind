/**
 * Created by ubaig on 05/29/2015.
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
 * RedEyeCommon class that has the Common functionality
 */
var VuFindCommon = (function () {
    return {
        /**
         * Init method
         */
        initialize: function () {

        },
        /**
         * This function prints error logs in NetSuite server script or in browser console.
         *
         * @param {string} fn function name
         * @param {nlobjError, Exception}  e NetSuite or JavaScript error object
         * @return {void}
         *
         * @since    Jan 12, 2015
         */
        logException: function (fn, e) {
            var err = '';
            if (e instanceof nlobjError) {
                err = 'System error: ' + e.getCode() + '\n' + e.getDetails();
            }
            else {
                err = 'Unexpected error: ' + e.toString();
            }
            if (!!window.console) {
                console.log('ERROR :: ' + fn + ' :: ' + err);
            } else {
                nlapiLogExecution('ERROR', fn, err);
            }
        },
        logDebug: function (title, description) {
            if (!!window.console) {
                console.log('DEBUG :: ' + title + ' :: ' + description);
            } else {
                nlapiLogExecution('DEBUG', title, description);
            }
        },
        isBlankOrNull: function (str) {
            return str == null || str == undefined || typeof (str) == 'undefined' || str == 'undefined' || (str + '').trim().length == 0;
        }
    };
})();