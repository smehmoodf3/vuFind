var addItemFrmCSVGVs = {};
addItemFrmCSVGVs.childWindow = null;
addItemFrmCSVGVs.childCheckTimer = null;

jQuery(document).ready(function () {
    showAddFrmCSVDialogue();
});

function getGUID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function fileUpload() {

    /* only one file can be uploaded at a time */
    if (addItemFrmCSVGVs.childWindow == null) {
        var signOut = jQuery("div:contains('Sign Out')");
        if (signOut.length > 0) {
            var guid = getGUID();
            var params = '&guid=' + guid;
            addItemFrmCSVGVs.childCheckTimer = setInterval(function () {
                addItemsStarter(guid);
            }, 10);
            addItemFrmCSVGVs.childWindow = window.open('https://forms.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=customscript_csv_file_upload&deploy=customdeploy_csv_file_upload&compid=3669980&h=bdc05d594a565f20f591' + params, 'wizard_popup', 'width=600,height=330,resizable=yes,scrollbars=no');
        } else {
            alert("Please login to continue.");
        }
    }

}

function addItemsStarter(guid) {
    if (addItemFrmCSVGVs.childWindow && addItemFrmCSVGVs.childWindow.closed) {
        clearInterval(addItemFrmCSVGVs.childCheckTimer);
        addItemsFromCSV(guid);
    }
}

function addItemsFromCSV(guid) {
    var params = "&guid=" + guid;
    jQuery.ajax({url: "https://forms.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=customscript_fh_for_add_items_frm_csv&deploy=customdeploy_fh_for_add_items_frm_csv&compid=3669980&h=4240fdb7b2f7e67a8c86" + params,
        dataType: "jsonp",
        jsonpCallback: 'itemsData'
    });

}

function itemsData(data) {
    /* data.fileId checks whether file was uploaded OR not */
    if (!isBlankOrNull(data.fileId)) {
        if (objectSize(data.itemQty) > 0) {
//            console.log("aja bhai aja" + JSON.stringify(data));
            //alert("Adding items to cart. Please wait..")
            document.getElementById('dialog_message').title = 'Adding Items To Cart';
            document.getElementById('dialog_message_innerDiv').innerHTML = 'Adding Items To Cart. Please Wait..';
            /* show modal dialogue */
            modalDialogShow(false);

            /* local storage */
            localStorage.setItem("showAddFrmCSVMsg", "true");

            var identAdded = "";
            for (var itemAdd in data.identifiersAdded) {
                identAdded += data.identifiersAdded[itemAdd] + "<br />";
            }
            if (isBlankOrNull(identAdded)) {
                localStorage.setItem("identAdded", "");
            } else {
                localStorage.setItem("identAdded", identAdded);
            }
            var identNotAdded = "";
            for (var upcNotAdd in data.identifiersNotAdded) {
                identNotAdded += upcNotAdd + "<br />";
            }
            if (isBlankOrNull(identNotAdded)) {
                localStorage.setItem("identNotAdded", "");
            } else {
                localStorage.setItem("identNotAdded", identNotAdded);
            }


            var addCSVForm = document.getElementById("add_item_csv_form");

            var multiVal = "";
            for (var itemId in data.itemQty) {
                multiVal += itemId + "," + data.itemQty[itemId] + ";"
            }
            addCSVForm.elements["multi"].value = multiVal;
            addCSVForm.submit();
//            var addCSVForm = document.getElementById("add_item_csv_form").submit();
//            alert('item found. working on adding them');
        } else {
            alert('No items found against the UPCs entered');
        }
    }


    addItemFrmCSVGVs.childWindow = null;
}

function objectSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            size++;
        }
    }
    return size;
}

function isBlankOrNull(str) {
    return str == null || str == undefined || typeof (str) == 'undefined' || str == 'undefined' || (str + '').trim().length == 0;
}

function modalDialogShow(showDefault) {
    var j = {};
    j.query = jQuery.noConflict();
    j.query('#dialog_message').show();
    j.query('#dialog_message').dialog({
//        minWidth: '200',
        width: 'auto',
        modal: true,
        resizable: false,
        draggable: false,
        closeOnEscape: false,
        //position: {my: "center", at: "center", of: window},
        create: function (event, ui) {
            j.query(".ui-widget-header").show();
            if (showDefault) {
                j.query('.ui-dialog-titlebar-close').show();
            } else {
                j.query('.ui-dialog-titlebar-close').hide();
            }
        }
    }).height('auto');
}

function modalDialogClose() {
    var j = {};
    j.query = jQuery.noConflict();
    j.query('#dialog_message').dialog('close');
}

function showAddFrmCSVDialogue() {

    if (!isBlankOrNull(localStorage.getItem("showAddFrmCSVMsg")) && localStorage.getItem("showAddFrmCSVMsg") === "true") {
        if (!isBlankOrNull(localStorage.getItem("identAdded"))) {
            var msg = "<b>UPC Codes Added</b><br />";
            msg += localStorage.getItem("identAdded");
            msg += "<br /> <br />";
        }

        if (!isBlankOrNull(localStorage.getItem("identNotAdded"))) {
            msg += "<b>UPC Codes Not Added</b><br />";
            msg += localStorage.getItem("identNotAdded");
        }

        localStorage.setItem("showAddFrmCSVMsg", "false");
        localStorage.setItem("identAdded", "");
        localStorage.setItem("identNotAdded", "");

        document.getElementById('dialog_message').title = 'Add Item From CSV Result';
        document.getElementById('dialog_message_innerDiv').innerHTML = msg;
        modalDialogShow(true);
    }

}

function isIEBrowser() {
    return (typeof (navigator) != 'undefined' && navigator.userAgent && navigator.userAgent.indexOf && navigator.userAgent.indexOf('MSIE') >= 0);
}


