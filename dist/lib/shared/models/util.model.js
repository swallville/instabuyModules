"use strict";
var product_model_1 = require("./product.model");
var productskit_model_1 = require("./productskit.model");
var IBUtil = (function () {
    function IBUtil() {
    }
    IBUtil.getItemsWithResponseDict = function (responseModel) {
        var items = [];
        for (var i = 0; i < responseModel.data.length; i++) {
            if (responseModel.data[i].item_type == 'product')
                items.push(new product_model_1.IBProduct(responseModel.data[i]));
            else if (responseModel.data[i].item_type == 'products_kit')
                items.push(new productskit_model_1.IBProductsKit(responseModel.data[i]));
        }
        return items;
    };
    IBUtil.removeObjectFromArray = function (array, object) {
        var index = array.indexOf(object);
        if (index >= 0)
            array.splice(index, 1);
    };
    IBUtil.getDate = function (server_utc_date) {
        var year = Number(server_utc_date.substring(0, 4));
        var month = Number(server_utc_date.substring(5, 7));
        var day = Number(server_utc_date.substring(8, 10));
        var hour = Number(server_utc_date.substring(11, 13));
        var minute = Number(server_utc_date.substring(14, 16));
        var date = new Date(Date.UTC(year, month - 1, day, hour, minute));
        return date;
    };
    return IBUtil;
}());
exports.IBUtil = IBUtil;
//# sourceMappingURL=util.model.js.map