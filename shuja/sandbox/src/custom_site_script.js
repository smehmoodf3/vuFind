jQuery(document).ready(function () {
    workForPONumberFld();
});

function workForPONumberFld() {
    var pageURL = document.URL;
    if (pageURL.indexOf('https://checkout.na1.netsuite.com/') >= 0 || pageURL.indexOf('http://checkout.na1.netsuite.com/') >= 0) {
        var poNoLabelSpanId = "otherrefnum_fs_lbl";
        var poNoInputFldSpanId = "otherrefnum_fs";
        var addFldsTbId = "additionalfieldstable";

        var poNoLabelSpan = document.getElementById(poNoLabelSpanId);
        if (poNoLabelSpan != null) {
            poNoLabelSpan.style.display = "none";
        }
        var poNoInputFldSpan = document.getElementById(poNoInputFldSpanId);
        if (poNoInputFldSpan != null) {
            poNoInputFldSpan.style.display = "none";
        }
        var addFldsTb = document.getElementById(addFldsTbId);
        if (addFldsTb != null) {
            var row = addFldsTb.insertRow(2);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = "<b>PO #</b>";

            var cell2 = row.insertCell(1);
            var inputElement1 = document.createElement('input');
            inputElement1.type = "text";
            inputElement1.id = "otherrefnum_temp";
            inputElement1.name = "otherrefnum_temp";
            //inputElement1.setAttribute("onchange", "document.getElementById('otherrefnum').value = document.getElementById('otherrefnum_temp').value;");
            inputElement1.value = "";
            inputElement1.className = "input";
            cell2.appendChild(inputElement1);

            var inputElement2 = document.createElement('input');
            inputElement2.type = "button";
            inputElement2.id = "otherrefnum_temp_btn";
            inputElement2.name = "otherrefnum_temp_btn";
            inputElement2.setAttribute("onclick", "document.getElementById('otherrefnum').value = document.getElementById('otherrefnum_temp').value; alert('PO# has been applied')");
            inputElement2.value = "Apply";
            inputElement2.className = "nlbutton";
            inputElement2.style.marginLeft = "3px";
            inputElement2.style.cursor = "pointer";
            inputElement2.style.outline = "none";
            cell2.appendChild(inputElement2);
        }
    }
}
