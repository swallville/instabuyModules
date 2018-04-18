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
var productskit_model_1 = require("./productskit.model");
var IBCart = (function (_super) {
    __extends(IBCart, _super);
    function IBCart() {
        var _this = _super.call(this) || this;
        _this.products = [];
        _this.kits = [];
        return _this;
    }
    IBCart.prototype.setData = function (data) {
        this.data = data;
        this.products = new Array();
        this.kits = new Array();
        if (!data || (!data.products && !data.kits))
            return;
        for (var i = 0; i < data.products.length; i++) {
            this.products.push(new product_model_1.IBProduct(data.products[i]));
        }
        for (var i = 0; i < data.kits.length; i++) {
            this.kits.push(new productskit_model_1.IBProductsKit(data.kits[i]));
        }
        this.buyHasOnlyServiceProducts();
    };
    IBCart.prototype.subtotal = function () {
        if (!this.hasItemOnCart())
            return 0;
        var sum = 0;
        this.products.forEach(function (product) {
            sum += product.prices[0].getValidPrice() * product.prices[0].qtdOnCart;
        });
        this.kits.forEach(function (kit) {
            sum += kit.getTotalPrice();
        });
        return sum;
    };
    IBCart.prototype.deliveryTax = function () {
        if (this.cartOfService)
            return 0;
        if (!this.deliveryRule)
            return 0;
        if (this.coupon && this.coupon.couponType == 'deli_free')
            return this.deliveryRule.tax;
        if (this.deliveryRule.minPrice < this.subtotal() - this.discount())
            return 0;
        return this.deliveryRule.tax;
    };
    IBCart.prototype.discount = function () {
        if (!this.coupon)
            return 0;
        var couponModel = this.coupon;
        if (couponModel.couponType == 'deli_free')
            return this.deliveryTax();
        if (couponModel.couponType == 'buy_fixe')
            return couponModel['value'];
        return (couponModel['value'] / 100.0) * this.subtotal();
    };
    IBCart.prototype.total = function () {
        if (!this.hasItemOnCart())
            return 0;
        return this.subtotal() + this.deliveryTax() - this.discount();
    };
    IBCart.prototype.hasItemOnCart = function () {
        return this.products.length > 0 || this.kits.length > 0;
    };
    IBCart.prototype.buyHasOnlyServiceProducts = function () {
        if (this.kits.length > 0) {
            this.cartOfService = false;
            return;
        }
        for (var i = 0; i < this.products.length; i++) {
            if (!this.products[i].is_service) {
                this.cartOfService = false;
                return;
            }
        }
        this.cartOfService = true;
    };
    return IBCart;
}(object_model_1.IBObject));
exports.IBCart = IBCart;
//# sourceMappingURL=cart.model.js.map