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
var core_1 = require("@angular/core");
var store_model_1 = require("../models/store.model");
var layout_model_1 = require("../models/layout.model");
var response_model_1 = require("../models/response.model");
var request_service_1 = require("../services/request.service");
var observable_module_1 = require("../modules/observable.module");
var coupon_model_1 = require("../models/coupon.model");
var general_module_1 = require("../modules/general.module");
var util_model_1 = require("../models/util.model");
var list_model_1 = require("../models/list.model");
var IBItemsSortEnum;
(function (IBItemsSortEnum) {
    IBItemsSortEnum[IBItemsSortEnum["recents"] = 0] = "recents";
    IBItemsSortEnum[IBItemsSortEnum["nameaz"] = 1] = "nameaz";
    IBItemsSortEnum[IBItemsSortEnum["nameza"] = 2] = "nameza";
    IBItemsSortEnum[IBItemsSortEnum["pricemin"] = 3] = "pricemin";
    IBItemsSortEnum[IBItemsSortEnum["pricemax"] = 4] = "pricemax";
})(IBItemsSortEnum = exports.IBItemsSortEnum || (exports.IBItemsSortEnum = {}));
var IBItemsCallOptionsModel = (function () {
    function IBItemsCallOptionsModel() {
    }
    IBItemsCallOptionsModel.prototype.getSort = function () {
        switch (this.sort) {
            case IBItemsSortEnum.nameaz: return "nameaz";
            case IBItemsSortEnum.nameza: return "nameza";
            case IBItemsSortEnum.pricemin: return "pricemin";
            case IBItemsSortEnum.pricemax: return "pricemax";
            default: return "";
        }
    };
    IBItemsCallOptionsModel.prototype.args = function () {
        if (this.product_id)
            return "product_id=" + this.product_id;
        if (this.kit_id)
            return "kit_id=" + this.kit_id;
        var args = "";
        if (this.subcategory_id)
            args += "subcategory_id=" + this.subcategory_id + "&";
        else if (this.category_id)
            args += "category_id=" + this.category_id + "&";
        if (this.page)
            args += "page=" + this.page + "&";
        if (this.N)
            args += "N=" + this.N + "&";
        var sort = this.getSort();
        if (sort)
            args += "sort=" + sort + "&";
        return args;
    };
    return IBItemsCallOptionsModel;
}());
exports.IBItemsCallOptionsModel = IBItemsCallOptionsModel;
var IBStoreService = (function (_super) {
    __extends(IBStoreService, _super);
    function IBStoreService(http, cartService, router) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.cartService = cartService;
        _this.router = router;
        _this.storeModel = new store_model_1.IBStore();
        _this.observers = new Array();
        return _this;
    }
    // metodos para observer, NAO SOBREESCREVER
    IBStoreService.prototype.registerObserver = function (observer) {
        this.observers.push(observer);
    };
    IBStoreService.prototype.unregisterObserver = function (observer) {
        var index = this.observers.indexOf(observer);
        if (index >= 0)
            this.observers.splice(index, 1);
    };
    IBStoreService.prototype.notifyObservers = function (message) {
        for (var i = 0; i < this.observers.length; i++) {
            this.observers[i].notify(message);
        }
    };
    IBStoreService.prototype.fetchSync = function () {
        var fields = 'name,subdomain,cover,mark,loc,address,cep,tel,hours,moneyPayment,checkPayment,onlinePayment,billetPayment,depositPayment,depositInfo,offlinePayment,makeShipping,visible,blocked,min_price_allowed,installmentsrules,description,schedule,window_time,background_color,slogan,background_image,acceptedCards,localities,medias,makeDelivery,makeCollect,is_market,available_deliveries,is_market,pages,google_analytics_key,favicon,fb_pixel_key,whitelabel';
        var args = '?fields=' + fields;
        var xmlHttp = new XMLHttpRequest();
        var url = this.createUrl('/store.json', args);
        xmlHttp.open("GET", url, false); // false for synchronous request
        xmlHttp.withCredentials = true;
        xmlHttp.send(null);
        var response = new response_model_1.IBResponse(JSON.parse(xmlHttp.responseText));
        if (response.status) {
            this.storeModel.setData(response.data);
            this.storeId = this.storeModel.id;
            return true;
        }
        else {
            return false;
        }
    };
    IBStoreService.prototype.initializeStore = function () {
        this.pullMainMenu();
        return this.fetchSync();
    };
    IBStoreService.prototype.initializeSubdomainStore = function (subdomain) {
        var fields = 'name,subdomain,cover,mark,loc,address,cep,tel,hours,moneyPayment,checkPayment,onlinePayment,billetPayment,offlinePayment,makeShipping,visible,blocked,min_price_allowed,installmentsrules,description,schedule,window_time,background_color,slogan,background_image,acceptedCards,localities,medias,makeDelivery,makeCollect,is_market,available_deliveries,is_market,google_analytics_key,favicon,fb_pixel_key,whitelabel';
        var args = '?subdomain=' + subdomain + '&fields=' + fields;
        var xmlHttp = new XMLHttpRequest();
        var url = "https://instabuy.com.br/apiv3/store.json" + args;
        xmlHttp.open("GET", url, false); // false for synchronous request
        xmlHttp.withCredentials = true;
        xmlHttp.send(null);
        var response = new response_model_1.IBResponse(JSON.parse(xmlHttp.responseText));
        this.storeModel.setData(response.data);
        this.storeId = this.storeModel.id;
    };
    // 
    // CHAMADAS AUTOMATICAS
    // 
    IBStoreService.prototype.fetchItems = function (option) {
        var endpoint = "/item.json";
        var args = option.args();
        return this.getRequest(this.createUrl(endpoint, args));
    };
    IBStoreService.prototype.pullItems = function (option, callBack) {
        var _this = this;
        this.fetchItems(option).subscribe(function (responseModel) {
            var items = [];
            var token = general_module_1.tokenGenerator();
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                items = util_model_1.IBUtil.getItemsWithResponseDict(responseModel);
                _this.cartService.setQtdOnCartOnItemsAndSubscribe(items);
            }
            if (callBack)
                callBack(items, responseModel);
        });
    };
    IBStoreService.prototype.pullProduct = function (productId, callBack) {
        var option = new IBItemsCallOptionsModel();
        option.product_id = productId;
        this.pullItems(option, function (items, responseModel) {
            if (items.length == 0)
                items.push(undefined);
            if (callBack)
                callBack(items[0], responseModel);
        });
    };
    IBStoreService.prototype.pullKit = function (kitId, callBack) {
        var option = new IBItemsCallOptionsModel();
        option.kit_id = kitId;
        this.pullItems(option, function (items, responseModel) {
            if (items.length == 0)
                items.push(undefined);
            if (callBack)
                callBack(items[0], responseModel);
        });
    };
    IBStoreService.prototype.searchForProduct = function (search, callBack, page, N) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (N === void 0) { N = 25; }
        var endpoint = '/search.json';
        var args = '?page=' + page + '&N=' + N + '&search=' + search.split(' ').join('+');
        this.getRequest(this.createUrl(endpoint, args)).subscribe(function (responseModel) {
            var items = [];
            items = util_model_1.IBUtil.getItemsWithResponseDict(responseModel);
            _this.cartService.setQtdOnCartOnItemsAndSubscribe(items);
            callBack(items, responseModel);
        });
    };
    /** Retorna observable da requisicao de layout da pagina */
    IBStoreService.prototype.fetchLayout = function () {
        var endpoint = "/layout.json";
        return this.getRequest(this.createUrl(endpoint));
    };
    /** Faz requisicao de layout e insere o layout na loja */
    IBStoreService.prototype.pullLayout = function (callBack) {
        var _this = this;
        this.fetchLayout().subscribe(function (responseModel) {
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                var layoutModel = new layout_model_1.IBLayout(responseModel.data);
                _this.storeModel.layout = layoutModel;
                for (var _i = 0, _a = layoutModel.collection; _i < _a.length; _i++) {
                    var category = _a[_i];
                    _this.cartService.setQtdOnCartOnItemsAndSubscribe(category.items);
                }
                if (layoutModel.promotions)
                    _this.cartService.setQtdOnCartOnItemsAndSubscribe(layoutModel.promotions);
            }
            if (callBack)
                callBack(responseModel);
        });
    };
    IBStoreService.prototype.fetchMainMenu = function () {
        var endpoint = "/menu.json";
        var args = "?filter=show_order";
        return this.getRequest(this.createUrl(endpoint, args));
    };
    IBStoreService.prototype.pullMainMenu = function (callBack) {
        var _this = this;
        this.fetchMainMenu().subscribe(function (responseModel) {
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                _this.storeModel.setMainMenu(responseModel.data);
                _this.notifyObservers(observable_module_1.NotifyUpdate.onStore);
            }
            if (callBack)
                callBack(responseModel);
        });
    };
    IBStoreService.prototype.fetchCategories = function () {
        var endpoint = "/category.json";
        return this.getRequest(this.createUrl(endpoint, null));
    };
    IBStoreService.prototype.pullCategories = function (callBack) {
        this.fetchCategories().subscribe(function (responseModel) {
            if (callBack)
                callBack(responseModel);
        });
    };
    IBStoreService.prototype.fetchDeliveryPrice = function (cep) {
        var endpoint = "/hasdelivery.json";
        var args = "?code=" + cep;
        return this.getRequest(this.createUrl(endpoint, args));
    };
    IBStoreService.prototype.pullDeliveryPrice = function (cep, callBack) {
        this.fetchDeliveryPrice(cep).subscribe(function (responseModel) {
            if (callBack)
                callBack(responseModel);
        });
    };
    IBStoreService.prototype.fetchCoupon = function (couponCode) {
        var endpoint = "/coupon.json";
        var args = "?code=" + couponCode;
        return this.getRequest(this.createUrl(endpoint, args));
    };
    IBStoreService.prototype.validateCoupon = function (couponCode, callBack) {
        this.fetchCoupon(couponCode).subscribe(function (responseModel) {
            var couponModel;
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                var responseData = void 0;
                responseData = responseModel.data;
                if (responseData.length == undefined) {
                    couponModel = new coupon_model_1.IBCoupon(responseData);
                }
                else {
                    couponModel = undefined;
                }
            }
            if (callBack)
                callBack(couponModel, responseModel);
        });
    };
    IBStoreService.prototype.registerCardHash = function (number, name, expirationMonth, expirationYear, cvv, successCallBack, errorCallBack) {
        var hashKey = "ek_live_xXTPAO2M7kUdudRac5TVkULZlcmpmV";
        PagarMe.encryption_key = hashKey;
        var PMCard = new PagarMe.creditCard();
        PMCard.cardHolderName = name;
        PMCard.cardExpirationMonth = expirationMonth;
        PMCard.cardExpirationYear = expirationYear;
        PMCard.cardNumber = number;
        PMCard.cardCVV = cvv;
        var fieldErrors = PMCard.fieldErrors();
        var hasErrors = false;
        for (var field in fieldErrors) {
            hasErrors = true;
            break;
        }
        if (hasErrors) {
            // realiza o tratamento de erros
            errorCallBack(fieldErrors);
        }
        else {
            // se não há erros, gera o card_hash...
            PMCard.generateHash(function (cardHash) {
                successCallBack(cardHash);
            });
        }
    };
    IBStoreService.prototype.placeOrder = function (orderObject, callBack) {
        var endpoint = '/buy.json';
        this.postXWWFormUrlEnconded(this.createUrl(endpoint), orderObject).subscribe(function (responseModel) {
            if (callBack)
                callBack(responseModel);
        });
    };
    IBStoreService.prototype.sendMessage = function (name, tel, email, message, callBack) {
        var endpoint = '/message.json';
        if (tel && tel != '') {
            this.postRequest(this.createUrl(endpoint), { name: name, phone: tel, email: email, message: message, device: 'web' }).subscribe(function (responseModel) {
                if (callBack)
                    callBack(responseModel);
            });
        }
        else {
            this.postRequest(this.createUrl(endpoint), { name: name, email: email, message: message, device: 'web' }).subscribe(function (responseModel) {
                if (callBack)
                    callBack(responseModel);
            });
        }
    };
    IBStoreService.prototype.subscribeNewsletter = function (email, callBack) {
        var endpoint = '/newsletter.json';
        this.postRequest(this.createUrl(endpoint), { email: email, device: 'web' }).subscribe(function (responseModel) {
            if (callBack)
                callBack(responseModel);
        });
    };
    IBStoreService.prototype.getStoreId = function () {
        return this.storeId;
    };
    IBStoreService.prototype.fetchLists = function (list_id) {
        var endpoint = "/list.json";
        var args;
        if (list_id) {
            args = '?list_id=' + list_id;
        }
        return this.getRequest(this.createUrl(endpoint, args));
    };
    IBStoreService.prototype.pullLists = function (list_id, callBack) {
        this.fetchLists(list_id).subscribe(function (responseModel) {
            var lists = [];
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                for (var i = 0; i < responseModel.data.length; i++) {
                    lists.push(new list_model_1.IBProductsList(responseModel.data[i]));
                }
            }
            if (callBack)
                callBack(lists, responseModel);
        });
    };
    return IBStoreService;
}(request_service_1.IBRequestService));
IBStoreService = __decorate([
    core_1.Injectable()
], IBStoreService);
exports.IBStoreService = IBStoreService;
