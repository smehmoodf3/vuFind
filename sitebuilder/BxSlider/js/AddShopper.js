if ("undefined" == typeof AddShoppersLoader) {
    var AddShoppersLoader = {rev: {"widget.js": "8d62ce77", "widget.css": "44db4c86", "wall.js": "68211a1b", "raf.js": "68211a1b"}, lang: {de_DE: "?v=3", es_MX: "?v=4", el_GR: "?v=2", fr_FR: "?v=2", nl_NL: "?v=4", pt_BR: "?v=3", no_NO: "?v=2", ru_RU: "?v=3", ro_RO: "?v=2", sv_SE: "?v=2", tr_TR: "?v=2", cs_CZ: "?v=3", it_IT: "?v=2"}, load: function (b, c) {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.charset = "UTF-8";
        a.readyState ? a.onreadystatechange = function () {
            if ("loaded" == a.readyState ||
                "complete" == a.readyState)a.onreadystatechange = null, c && c.apply(AddShoppersLoader)
        } : (a.onload = function () {
            c && c.apply(AddShoppersLoader)
        }, a.onerror = function () {
            c && c.apply(AddShoppersLoader)
        });
        a.src = b;
        document.getElementsByTagName("head")[0].appendChild(a)
    }, init: function () {
        var b = "https:" == document.location.protocol, c = b ? "https://d3rr3d0n31t48m.cloudfront.net" : "http://cdn.shop.pe", a = (b ? "https://" : "http://") + "shop.pe/", d = (b ? "https://" : "http://") + "addshoppers.s3.amazonaws.com";
        this.load(c + "/widget/widget.js?v=" +
            this.rev["widget.js"], function () {
            document.getElementById("AddShoppersWall") && this.load(a + "/plugins/discovery_wall/wall.min.js?v=" + this.rev["wall.js"]);
            document.getElementById("AddShoppersRefer") && this.load(d + "/plugins/raf/build/raf.min.js?v=" + this.rev["raf.js"])
        });
        b = document.createElement("link");
        b.rel = "stylesheet";
        b.type = "text/css";
        b.href = c + "/widget/widget.css?v=" + this.rev["widget.css"];
        document.getElementsByTagName("head")[0].appendChild(b)
    }};
    AddShoppersLoader.init()
}
;
/**
 * Created by smehmood on 6/9/2015.
 */
