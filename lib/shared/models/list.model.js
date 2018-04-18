"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var object_model_1 = require("./object.model");
var product_model_1 = require("./product.model");
var dateutil_model_1 = require("./dateutil.model");
var general_module_1 = require("../modules/general.module");
var IBProductsListItem = (function (_super) {
    __extends(IBProductsListItem, _super);
    function IBProductsListItem(data) {
        var _this = _super.call(this) || this;
        if (Object.keys(data).length > 0)
            _this.setData(data);
        return _this;
    }
    IBProductsListItem.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        if (data['product']['name'])
            this.product = new product_model_1.IBProduct(data['product']);
    };
    return IBProductsListItem;
}(object_model_1.IBObject));
exports.IBProductsListItem = IBProductsListItem;
var IBProductsList = (function (_super) {
    __extends(IBProductsList, _super);
    function IBProductsList(data) {
        var _this = _super.call(this) || this;
        if (Object.keys(data).length > 0)
            _this.setData(data);
        return _this;
    }
    IBProductsList.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        this.created_at = dateutil_model_1.IBDateUtil.getDate(data['created_at']);
        this.products = [];
        if (data['products'] && data['products'].length > 0) {
            for (var i = 0; i < data['products'].length; i++) {
                if (data['products'])
                    this.products.push(new IBProductsListItem(data['products'][i]));
            }
        }
    };
    IBProductsList.prototype.getRouterLinkUrl = function () {
        return '/perfil/lista/' + this.id + '/' + general_module_1.removeSpecialCharacters(this.name);
    };
    return IBProductsList;
}(object_model_1.IBObject));
exports.IBProductsList = IBProductsList;
