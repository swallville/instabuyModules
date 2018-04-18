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
var item_model_1 = require("./item.model");
var dateutil_model_1 = require("./dateutil.model");
var IBProductsKit = (function (_super) {
    __extends(IBProductsKit, _super);
    function IBProductsKit(data) {
        var _this = _super.call(this, data) || this;
        _this.qtdOnCart = 0;
        _this.auxQtdCart = 1;
        if (Object.keys(data).length > 0)
            _this.setData(data);
        return _this;
    }
    IBProductsKit.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        if (this.promo_end_at)
            this.promo_end_at = dateutil_model_1.IBDateUtil.getDate(data['promo_end_at']);
        this.bundles = [];
        if (data['bundles'] && data['bundles'].length > 0) {
            for (var i = 0; i < data['bundles'].length; i++) {
                this.bundles.push(new IBProductsKitBundle(data['bundles'][i]));
            }
        }
    };
    IBProductsKit.prototype.getValidPrice = function () {
        if (this.promo_end_at && this.promo_end_at.getTime() > Date.now() && this.promo_price)
            return this.promo_price;
        else
            return this.price;
    };
    IBProductsKit.prototype.inPromotion = function () {
        return this.price != this.getValidPrice();
    };
    IBProductsKit.prototype.qtdBadge = function () {
        return 0;
    };
    IBProductsKit.prototype.enoughStockForNKits = function (qtd) {
        //todo validates child product stock
        return true;
    };
    IBProductsKit.prototype.getPrice = function () {
        var total = this.getValidPrice();
        for (var _i = 0, _a = this.bundles; _i < _a.length; _i++) {
            var bundle = _a[_i];
            for (var _b = 0, _c = bundle.products; _b < _c.length; _b++) {
                var product = _c[_b];
                total = total + (product.additional_price * Math.max(product.qtdOnCart, product.auxQtdCart));
            }
        }
        return total;
    };
    IBProductsKit.prototype.getTotalPrice = function () {
        return this.getPrice() * Math.max(this.qtdOnCart, this.auxQtdCart);
    };
    IBProductsKit.prototype.getItemsText = function () {
        var mString = "";
        this.bundles.forEach(function (bundle) {
            mString = mString + bundle.textForItems();
        });
        return mString;
    };
    /* ###################################
    ############ CART METHODS ############
    ################################### */
    IBProductsKit.prototype.getCartDocument = function (attachment) {
        var cartDoc = {
            kit_id: this.id,
            qtd: this.auxQtdCart,
            attachment: attachment
        };
        var bundlesDoc = [];
        for (var _i = 0, _a = this.bundles; _i < _a.length; _i++) {
            var bundle = _a[_i];
            var bundleDoc = {
                bundle_id: bundle.id
            };
            var products = [];
            for (var _b = 0, _c = bundle.products; _b < _c.length; _b++) {
                var product = _c[_b];
                if (product.auxQtdCart > 0)
                    products.push({
                        product_id: product.data.id,
                        qtd: product.auxQtdCart
                    });
            }
            bundleDoc['products'] = products;
            bundlesDoc.push(bundleDoc);
        }
        cartDoc['bundles'] = bundlesDoc;
        return cartDoc;
    };
    return IBProductsKit;
}(item_model_1.IBItem));
exports.IBProductsKit = IBProductsKit;
var IBProductsKitBundle = (function (_super) {
    __extends(IBProductsKitBundle, _super);
    function IBProductsKitBundle(data) {
        var _this = _super.call(this, data) || this;
        if (Object.keys(data).length > 0)
            _this.setData(data);
        return _this;
    }
    IBProductsKitBundle.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        this.products = [];
        if (data['products'] && data['products'].length > 0) {
            for (var i = 0; i < data['products'].length; i++) {
                this.products.push(new IBProductsKitBundleItem(data['products'][i]));
            }
        }
    };
    IBProductsKitBundle.prototype.numberOfItensSelected = function () {
        var qtd = 0;
        this.products.forEach(function (product) {
            qtd += product.auxQtdCart;
        });
        return qtd;
    };
    IBProductsKitBundle.prototype.hasProductSelected = function () {
        for (var _i = 0, _a = this.products; _i < _a.length; _i++) {
            var prod = _a[_i];
            if (prod.auxQtdCart > 0)
                return true;
        }
        return false;
    };
    IBProductsKitBundle.prototype.textForItems = function () {
        var mString = '';
        this.products.forEach(function (product) {
            if (product.qtdOnCart > 0) {
                if (mString != '')
                    mString = mString + ', ';
                if (product.qtdOnCart == 1)
                    mString = mString + product.data.name;
                else
                    mString = mString + product.qtdOnCart + 'x ' + product.data.name;
            }
        });
        if (mString != '')
            mString = mString + '. ';
        return mString;
    };
    return IBProductsKitBundle;
}(object_model_1.IBObject));
exports.IBProductsKitBundle = IBProductsKitBundle;
var IBProductsKitBundleItem = (function (_super) {
    __extends(IBProductsKitBundleItem, _super);
    function IBProductsKitBundleItem(data) {
        var _this = _super.call(this, data) || this;
        _this.qtdOnCart = 0;
        _this.auxQtdCart = 0;
        if (Object.keys(data).length > 0)
            _this.setData(data);
        return _this;
    }
    IBProductsKitBundleItem.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        if (data['data'] && data['data']['name']) {
            this.data = new product_model_1.IBProduct(data['data']);
        }
    };
    IBProductsKitBundleItem.prototype.textForProduct = function () {
        if (this.auxQtdCart == 1)
            return this.data.name;
        else if (this.auxQtdCart > 1)
            return this.auxQtdCart + 'x ' + this.data.name;
        else
            return "";
    };
    return IBProductsKitBundleItem;
}(object_model_1.IBObject));
exports.IBProductsKitBundleItem = IBProductsKitBundleItem;
