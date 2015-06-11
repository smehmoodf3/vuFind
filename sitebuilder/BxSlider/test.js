<!-- Google Analytics eCommerce Tracking Code -->


function googlePushOrder1() {
    try {
        if (document.URL.indexOf("thanks") != -1) {

            var rows = document.getElementById("ordersummary_total").parentNode.rows;


            for (var i = 0; i < rows.length; i++) {
                try {
                    var skuName = rows[i].cells[2].innerHTML;
                    var qty = rows[i].cells[5].innerHTML;
                    var prodName = rows[i].cells[3].innerHTML;
                    var price = rows[i].cells[6].innerHTML;
                }
                catch (e) {
                    //alert('in catch 2  '+e);
                }
            }
        }
    }
    catch (e) {
        //alert(e);
    }
}

