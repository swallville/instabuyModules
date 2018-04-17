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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var request_service_1 = require("./request.service");
var response_model_1 = require("../models/response.model");
var cart_model_1 = require("../models/cart.model");
var product_model_1 = require("../models/product.model");
var analytics_service_1 = require("./analytics.service");
var items_observer_model_1 = require("../models/items_observer.model");
var util_model_1 = require("../models/util.model");
var IBCartService = (function (_super) {
    __extends(IBCartService, _super);
    function IBCartService(http, analytics) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.analytics = analytics;
        _this.mergeCommandsObj = {};
        _this.cartModel = new cart_model_1.IBCart();
        _this.itemsObservable = new items_observer_model_1.IBItemsObservable();
        _this.pullCart(); // pull cart for user
        return _this;
    }
    // esvazia carrinho
    IBCartService.prototype.clearCart = function () {
        for (var _i = 0, _a = this.cartModel.products; _i < _a.length; _i++) {
            var prod = _a[_i];
            this.itemsObservable.observers.push(prod);
            this.itemsObservable.notifyObservers({ id: prod.id, model_id: prod.prices[0].id, qtd: 0 });
        }
        for (var _b = 0, _c = this.cartModel.kits; _b < _c.length; _b++) {
            var kit = _c[_b];
            this.itemsObservable.observers.push(kit);
            this.itemsObservable.notifyObservers({ id: kit.id, kit_cart_id: kit.cart_id, qtd: 0 });
        }
        this.cartModel.products = [];
        this.cartModel.kits = [];
    };
    // REALIZA A CHAMADA DO CARRINHO DO USUARIO
    IBCartService.prototype.fetchCart = function () {
        var endpoint = "/cart.json";
        return this.getRequest(this.createUrl(endpoint));
    };
    IBCartService.prototype.pullCart = function (postBack) {
        var _this = this;
        this.fetchCart().subscribe(function (responseModel) {
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                _this.clearCart();
                _this.cartModel.setData(responseModel.data);
                for (var _i = 0, _a = _this.cartModel.products; _i < _a.length; _i++) {
                    var prod = _a[_i];
                    _this.itemsObservable.observers.push(prod);
                    _this.itemsObservable.notifyObservers({ id: prod.id, model_id: prod.prices[0].id, qtd: prod.prices[0].qtdOnCart });
                }
                for (var _b = 0, _c = _this.cartModel.kits; _b < _c.length; _b++) {
                    var kit = _c[_b];
                    _this.itemsObservable.observers.push(kit);
                    _this.itemsObservable.notifyObservers({ id: kit.id, kit_cart_id: kit.cart_id, qtd: kit.qtdOnCart });
                }
            }
            if (postBack)
                postBack(responseModel);
        });
    };
    IBCartService.prototype.makeRequest = function (merge_request_id, postDocument, delay, callBack) {
        var _this = this;
        var endpoint = '/cart.json';
        this.mergeRequests(merge_request_id, function () {
            _this.postRequest(_this.createUrl(endpoint), postDocument).subscribe(function (responseModel) {
                if (responseModel.status == response_model_1.IBResponseStatus.success) {
                }
                if (callBack)
                    callBack(responseModel);
            });
        }, delay);
    };
    IBCartService.prototype.mergeRequests = function (identity, command, time) {
        var _this = this;
        if (time === void 0) { time = 1400; }
        if (!this.mergeCommandsObj[identity]) {
            this.mergeCommandsObj[identity] = [];
        }
        this.mergeCommandsObj[identity].push(command);
        var len = this.mergeCommandsObj[identity].length;
        setTimeout(function () {
            if (len == _this.mergeCommandsObj[identity].length) {
                _this.mergeCommandsObj[identity] = [];
                command();
            }
        }, time);
    };
    IBCartService.prototype.postListOnCart = function (list_id) {
        var endpoint = "/cart_list.json";
        var params = {
            list_id: list_id
        };
        return this.postRequest(this.createUrl(endpoint), params);
    };
    //----------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------CONTROLE DE QUANTIDADES DE PRODUTOS ---------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------
    IBCartService.prototype.setQtdOnCartOnItemsAndSubscribe = function (items) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            //subscribe to receive qtds changes
            this.itemsObservable.observers.push(item);
            //qtd validation
            if (item.item_type == 'product') {
                var product = item;
                for (var _a = 0, _b = this.cartModel.products; _a < _b.length; _a++) {
                    var cart_item = _b[_a];
                    if (cart_item.id == product.id) {
                        for (var _c = 0, _d = product.prices; _c < _d.length; _c++) {
                            var price = _d[_c];
                            if (price.id == cart_item.prices[0].id) {
                                price.qtdOnCart = cart_item.prices[0].qtdOnCart;
                                break;
                            }
                        }
                    }
                }
            }
        }
    };
    //----------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------
    IBCartService.prototype.setItemOnCart = function (item, product_model, attachment, callBack) {
        var cartDoc;
        var request_id;
        if (item.item_type == 'product') {
            var product = item;
            if (product_model.qtd_stock == -1 || product_model.auxQtdCart <= product_model.qtd_stock) {
                product_model.qtdOnCart = product_model.auxQtdCart;
                cartDoc = product.getCartDocument(product_model, attachment);
                request_id = product.id + product_model.id;
                if (!this.itemAlreadyInCart(item.id, product_model.id, undefined)) {
                    var clone = new product_model_1.IBProduct(JSON.parse(JSON.stringify(product)));
                    clone.removeOtherModelsThan(product_model.id);
                    this.cartModel.products.push(clone);
                    this.itemsObservable.observers.push(clone);
                }
                this.itemsObservable.notifyObservers({ id: product.id, model_id: product_model.id, qtd: product_model.qtdOnCart });
            }
            else
                return false;
        }
        else if (item.item_type == 'products_kit') {
            var kit = item;
            if (kit.enoughStockForNKits(kit.auxQtdCart)) {
                cartDoc = kit.getCartDocument(attachment);
                request_id = kit.cart_id;
                this.cartModel.kits.push(kit);
            }
            else
                return false;
        }
        this.makeRequest(request_id, cartDoc, 0, callBack);
        return true;
    };
    IBCartService.prototype.incrementItemOnCart = function (item, callBack, delay) {
        if (delay === void 0) { delay = 1400; }
        var cartDoc;
        var request_id;
        if (item.item_type == 'product') {
            var product = item;
            var newQuantity = product.prices[0].qtdOnCart + product.increment_value;
            if (product.prices[0].qtd_stock == -1 || newQuantity <= product.prices[0].qtd_stock) {
                product.prices[0].qtdOnCart = newQuantity;
                cartDoc = product.getCartDocument(product.prices[0]);
                request_id = product.id + product.prices[0].id;
                if (!this.itemAlreadyInCart(item.id, product.prices[0].id, undefined)) {
                    var clone = new product_model_1.IBProduct(JSON.parse(JSON.stringify(product)));
                    clone.removeOtherModelsThan(product.prices[0].id);
                    this.cartModel.products.push(clone);
                    this.itemsObservable.observers.push(clone);
                }
                this.itemsObservable.notifyObservers({ id: product.id, model_id: product.prices[0].id, qtd: product.prices[0].qtdOnCart });
            }
            else
                return false;
        }
        else if (item.item_type == 'products_kit') {
            var kit = item;
            var newQuantity = kit.qtdOnCart + 1;
            if (kit.enoughStockForNKits(newQuantity)) {
                kit.qtdOnCart = newQuantity;
                cartDoc = { kit_cart_id: kit.cart_id, qtd: newQuantity, kit_id: kit.id };
                request_id = kit.cart_id;
            }
            else
                return false;
        }
        this.makeRequest(request_id, cartDoc, delay, callBack);
        return true;
    };
    IBCartService.prototype.decrementItemOnCart = function (item, callBack, delay) {
        if (delay === void 0) { delay = 1400; }
        var cartDoc;
        var request_id;
        if (item.item_type == 'product') {
            var product = item;
            var newQuantity = product.prices[0].qtdOnCart - product.increment_value;
            if (newQuantity >= 0) {
                product.prices[0].qtdOnCart = newQuantity;
                cartDoc = product.getCartDocument(product.prices[0]);
                request_id = product.id + product.prices[0].id;
                if (newQuantity == 0) {
                    util_model_1.IBUtil.removeObjectFromArray(this.cartModel.products, item);
                }
                this.itemsObservable.notifyObservers({ id: product.id, model_id: product.prices[0].id, qtd: product.prices[0].qtdOnCart });
            }
            else
                return false;
        }
        else if (item.item_type == 'products_kit') {
            var kit = item;
            var newQuantity = kit.qtdOnCart - 1;
            if (newQuantity >= 0) {
                kit.qtdOnCart = newQuantity;
                cartDoc = { kit_cart_id: kit.cart_id, qtd: newQuantity, kit_id: kit.id };
                request_id = kit.cart_id;
                if (newQuantity == 0) {
                    util_model_1.IBUtil.removeObjectFromArray(this.cartModel.kits, item);
                }
            }
            else
                return false;
        }
        this.makeRequest(request_id, cartDoc, delay, callBack);
        return true;
    };
    IBCartService.prototype.removeItemFromCart = function (item, callBack) {
        var cartDoc;
        var request_id;
        if (item.item_type == 'product') {
            var product = item;
            product.prices[0].qtdOnCart = 0;
            cartDoc = product.getCartDocument(product.prices[0]);
            request_id = product.id + product.prices[0].id;
            util_model_1.IBUtil.removeObjectFromArray(this.cartModel.products, item);
            this.itemsObservable.notifyObservers({ id: product.id, model_id: product.prices[0].id, qtd: product.prices[0].qtdOnCart });
        }
        else if (item.item_type == 'products_kit') {
            var kit = item;
            cartDoc = { kit_cart_id: kit.cart_id, qtd: 0, kit_id: kit.id };
            request_id = kit.cart_id;
            util_model_1.IBUtil.removeObjectFromArray(this.cartModel.kits, item);
        }
        this.makeRequest(request_id, cartDoc, 0, callBack);
    };
    IBCartService.prototype.itemAlreadyInCart = function (id, product_model_id, kit_cart_id) {
        if (product_model_id) {
            for (var _i = 0, _a = this.cartModel.products; _i < _a.length; _i++) {
                var product = _a[_i];
                if (product.id == id && product.prices[0].id == product_model_id)
                    return true;
            }
        }
        else if (kit_cart_id) {
            for (var _b = 0, _c = this.cartModel.kits; _b < _c.length; _b++) {
                var kit = _c[_b];
                if (kit.cart_id == kit_cart_id)
                    return true;
            }
        }
        return false;
    };
    IBCartService.prototype.setListOnCart = function (list_id, callBack) {
        var _this = this;
        this.postListOnCart(list_id).subscribe(function (responseModel) {
            var lists = [];
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                _this.pullCart();
            }
            if (callBack)
                callBack(responseModel);
        });
    };
    return IBCartService;
}(request_service_1.IBRequestService));
IBCartService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, analytics_service_1.IBAnalytics])
], IBCartService);
exports.IBCartService = IBCartService;
//# sourceMappingURL=cart.service.js.map