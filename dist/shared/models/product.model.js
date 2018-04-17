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
var quantity_model_1 = require("./quantity.model");
var item_model_1 = require("./item.model");
var dateutil_model_1 = require("./dateutil.model");
var util_model_1 = require("./util.model");
var IBProductModel = (function (_super) {
    __extends(IBProductModel, _super);
    function IBProductModel(data, increment_value) {
        var _this = _super.call(this) || this;
        _this.qtdOnCart = 0;
        _this.auxQtdCart = 1;
        _this.setData(data);
        _this.auxQtdCart = Math.max(_this.qtdOnCart, increment_value);
        return _this;
    }
    IBProductModel.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        this.quantityModel = new quantity_model_1.IBQuantity(this.qtdOnCart);
        if (this.promo_end_at)
            this.promo_end_at = dateutil_model_1.IBDateUtil.getDate(data['promo_end_at']);
    };
    IBProductModel.prototype.qtd = function (value) {
        return this.quantityModel.qtd(value);
    };
    IBProductModel.prototype.inPromotion = function () {
        return this.price != this.getValidPrice();
    };
    IBProductModel.prototype.getValidPrice = function () {
        if (this.promo_end_at && this.promo_end_at.getTime() > Date.now() && this.promo_price)
            return this.promo_price;
        else
            return this.price;
    };
    return IBProductModel;
}(object_model_1.IBObject));
exports.IBProductModel = IBProductModel;
var IBProductLabelModel = (function (_super) {
    __extends(IBProductLabelModel, _super);
    function IBProductLabelModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IBProductLabelModel;
}(object_model_1.IBObject));
exports.IBProductLabelModel = IBProductLabelModel;
var IBProduct = (function (_super) {
    __extends(IBProduct, _super);
    function IBProduct(data) {
        var _this = _super.call(this, data) || this;
        if (Object.keys(data).length > 0)
            _this.setData(data);
        return _this;
    }
    IBProduct.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        if (this.unit_type == 'UNI')
            this.unit_type = 'unidade';
        else
            this.unit_type = this.unit_type.toLowerCase();
        this.prices = [];
        if (data && data['prices'] && data['prices'].length > 0) {
            for (var i = 0; i < data['prices'].length; i++) {
                this.prices.push(new IBProductModel(data['prices'][i], this.increment_value));
            }
        }
        this.related_products = [];
        if (data['related_products'] && data['related_products'].length > 0 && data['related_products'][0]['name']) {
            for (var i = 0; i < data['related_products'].length; i++) {
                if (data['related_products'][i]['visible'])
                    this.related_products.push(new IBProduct(data['related_products'][i]));
            }
        }
        this.variation_products = [];
        if (data['variation_products'] && data['variation_products'].length > 0 && data['variation_products'][0]['name']) {
            for (var i = 0; i < data['variation_products'].length; i++) {
                if (data['variation_products'][i]['visible'])
                    this.variation_products.push(new IBProduct(data['variation_products'][i]));
            }
        }
        this.labels = [];
        if (data['labels'] && data['labels'].length > 0) {
            for (var i = 0; i < data['labels'].length; i++) {
                this.labels.push(new IBProductLabelModel(data['labels'][i]));
            }
        }
    };
    IBProduct.prototype.qtdBadge = function () {
        var badge = 0;
        for (var _i = 0, _a = this.prices; _i < _a.length; _i++) {
            var price = _a[_i];
            badge += price.qtdOnCart;
        }
        return badge;
    };
    IBProduct.prototype.returnModel = function (modelId) {
        var model;
        if (!modelId) {
            model = this.prices[0];
            if (this.prices.length > 1) {
                for (var i = 0; i < this.prices.length; i++) {
                    if (this.prices[i].title == 'default') {
                        model = this.prices[i];
                        break;
                    }
                }
            }
        }
        else {
            for (var i = 0; i < this.prices.length; i++) {
                if (this.prices[i].id == modelId) {
                    model = this.prices[i];
                    break;
                }
            }
        }
        return model;
    };
    IBProduct.prototype.removeOtherModelsThan = function (model_id) {
        var models_to_remove = [];
        for (var _i = 0, _a = this.prices; _i < _a.length; _i++) {
            var model = _a[_i];
            if (model.id != model_id)
                models_to_remove.push(model);
        }
        for (var _b = 0, models_to_remove_1 = models_to_remove; _b < models_to_remove_1.length; _b++) {
            var model = models_to_remove_1[_b];
            util_model_1.IBUtil.removeObjectFromArray(this.prices, model);
        }
    };
    IBProduct.prototype.clearItem = function () {
        for (var i = 0; i < this.prices.length; i++) {
            this.prices[i].quantityModel.qtd(0);
        }
    };
    IBProduct.prototype.discountPercent = function () {
        var maxDiscount = 0;
        for (var i = 0; i < this.prices.length; i++) {
            var pc = this.prices[i];
            // todo validate promo price
            if (pc.promo_price) {
                var discount = (1 - (pc.promo_price / pc.price)) * 100;
                if (discount > maxDiscount)
                    maxDiscount = discount;
            }
        }
        return maxDiscount;
    };
    IBProduct.prototype.minPrice = function () {
        var minPrice = 999999;
        //todo implement right
        for (var i = 0; i < this.prices.length; i++) {
            var modelPrice = this.prices[i].getValidPrice();
            if (modelPrice < minPrice)
                minPrice = modelPrice;
        }
        return minPrice;
    };
    IBProduct.prototype.inPromotion = function () {
        for (var i = 0; i < this.prices.length; i++) {
            if (this.prices[i].inPromotion())
                return true;
        }
        return false;
    };
    IBProduct.prototype.cartSubtotal = function () {
        return this.prices[0].getValidPrice() * this.prices[0].qtdOnCart;
    };
    /* ###################################
    ############ CART METHODS ############
    ################################### */
    IBProduct.prototype.getCartDocument = function (model, attachment) {
        return { product_id: this.id, model_id: model.id, qtd: model.qtdOnCart, attachment: attachment };
    };
    return IBProduct;
}(item_model_1.IBItem));
exports.IBProduct = IBProduct;
//# sourceMappingURL=product.model.js.map