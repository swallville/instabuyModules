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
var user_model_1 = require("../models/user.model");
var response_model_1 = require("../models/response.model");
var observable_module_1 = require("../modules/observable.module");
var cart_service_1 = require("./cart.service");
var IBUserService = (function (_super) {
    __extends(IBUserService, _super);
    function IBUserService(http, cartService) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.cartService = cartService;
        _this.userLoggedIn = false;
        _this.userModel = new user_model_1.IBUser();
        _this.observers = new Array();
        _this.pullUser(true, true, true);
        return _this;
    }
    // metodos para observer, NAO SOBREESCREVER
    IBUserService.prototype.registerObserver = function (observer) {
        this.observers.push(observer);
    };
    IBUserService.prototype.unregisterObserver = function (observer) {
        var index = this.observers.indexOf(observer);
        if (index >= 0)
            this.observers.splice(index, 1);
    };
    IBUserService.prototype.notifyObservers = function (message) {
        for (var i = 0; i < this.observers.length; i++) {
            this.observers[i].notify(message);
        }
    };
    // REALIZA A CHAMADA DO USUARIO,
    // VERIFICA SE O USUARIO ESTA LOGADO
    IBUserService.prototype.fetchUser = function () {
        var endpoint = "/user.json";
        return this.getRequest(this.createUrl(endpoint));
    };
    IBUserService.prototype.fetchUserCards = function () {
        var endpoint = "/card.json";
        return this.getRequest(this.createUrl(endpoint));
    };
    IBUserService.prototype.fetchUserAddresses = function () {
        var endpoint = "/address.json";
        return this.getRequest(this.createUrl(endpoint));
    };
    IBUserService.prototype.fetchUserCoupons = function () {
        var endpoint = "/coupon.json";
        return this.getRequest(this.createUrl(endpoint));
    };
    IBUserService.prototype.pullUserCards = function (callBack) {
        var _this = this;
        if (!this.userModel) {
            if (callBack)
                callBack(new response_model_1.IBResponse({ status: 'error' }));
            return;
        }
        this.fetchUserCards().subscribe(function (responseModel) {
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                _this.userModel.setCards(responseModel.data);
            }
            if (callBack)
                callBack(responseModel);
        });
    };
    IBUserService.prototype.pullUserAdresses = function (callBack) {
        var _this = this;
        if (!this.userModel) {
            if (callBack)
                callBack(new response_model_1.IBResponse({ status: 'error' }));
            return;
        }
        this.fetchUserAddresses().subscribe(function (responseModel) {
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                _this.userModel.setAddresses(responseModel.data);
            }
            if (callBack)
                callBack(responseModel);
        });
    };
    IBUserService.prototype.pullUserCoupons = function (callBack) {
        var _this = this;
        if (!this.userModel) {
            if (callBack)
                callBack(new response_model_1.IBResponse({ status: 'error' }));
            return;
        }
        this.fetchUserCoupons().subscribe(function (responseModel) {
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                if (!responseModel.data.length) {
                    // object
                    _this.userModel.setCoupons([responseModel.data]);
                }
                else {
                    _this.userModel.setCoupons(responseModel.data);
                }
            }
            if (callBack)
                callBack(responseModel);
        });
    };
    IBUserService.prototype.fetchUserOrders = function () {
        var endpoint = "/buy.json";
        var args = "fields=store_id,status,datetime,buyType,comment,accountInformation,shippingInfo,history,items,combinations,code,band,delivery_date,paymentInformation,coupon,buy_sum,billet_url,billet_bar_code";
        return this.getRequest(this.createUrl(endpoint, args));
    };
    IBUserService.prototype.pullOrders = function (callBack) {
        var _this = this;
        if (!this.userModel) {
            if (callBack)
                callBack(new response_model_1.IBResponse({ status: 'error' }));
            return;
        }
        this.fetchUserOrders().subscribe(function (responseModel) {
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                _this.userModel.setOrders(responseModel.data);
            }
            if (callBack)
                callBack(responseModel);
        });
    };
    IBUserService.prototype.pullUser = function (cardPull, addressPull, couponPull, callBack) {
        var _this = this;
        this.fetchUser().subscribe(function (responseModel) {
            if (responseModel.type == 'not_founded') {
                _this.userLoggedIn = false;
                _this.notifyObservers(observable_module_1.NotifyUpdate.onUser);
            }
            else if (responseModel.status == response_model_1.IBResponseStatus.success) {
                _this.userModel.setData(responseModel.data);
                _this.userLoggedIn = true;
                if (cardPull)
                    _this.pullUserCards();
                if (addressPull)
                    _this.pullUserAdresses();
                if (couponPull)
                    _this.pullUserCoupons();
                _this.notifyObservers(observable_module_1.NotifyUpdate.onUser);
            }
            if (callBack)
                callBack(responseModel);
        });
    };
    // FAZ LOGIN DO USUARIO
    IBUserService.prototype.makeLogin = function (email, password, callBack) {
        var _this = this;
        var endpoint = '/login.json';
        var postDocument = { email: email, password: password };
        this.postRequest(this.createUrl(endpoint), postDocument).subscribe(function (responseModel) {
            _this.pullUser(true, true, true);
            if (callBack)
                callBack(responseModel);
            _this.cartService.pullCart();
        });
    };
    // REALIZA O LOGOUT DO USUARIO
    IBUserService.prototype.makeLogout = function (callBack) {
        var _this = this;
        var endpoint = '/logout.json';
        this.postRequest(this.createUrl(endpoint), {}).subscribe(function (responseModel) {
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                _this.userLoggedIn = false;
                _this.userModel = new user_model_1.IBUser();
                _this.notifyObservers(observable_module_1.NotifyUpdate.onUser);
                _this.cartService.pullCart();
            }
            if (callBack)
                callBack(responseModel);
        });
    };
    // PEDIR TROCA DE SENHA
    IBUserService.prototype.requestNewPassword = function (email, callBack) {
        var endpoint = '/forgotpassword.json';
        var landing_domain = window.location.host + '/acesso/recover_password/';
        var postDocument = { email: email, landing_domain: landing_domain };
        this.postRequest(this.createUrl(endpoint), postDocument).subscribe(function (responseModel) {
            if (callBack)
                callBack(responseModel);
        });
    };
    IBUserService.prototype.validateRecoveryPasswordToken = function (token, callBack) {
        var endpoint = '/validate_rptoken.json';
        var postDocument = { token: token };
        this.postRequest(this.createUrl(endpoint), postDocument).subscribe(function (responseModel) {
            if (callBack)
                callBack(responseModel);
        });
    };
    IBUserService.prototype.changePassword = function (password, token, callBack) {
        var endpoint = '/change_password.json';
        var postDocument = { password: password, token: token };
        this.postRequest(this.createUrl(endpoint), postDocument).subscribe(function (responseModel) {
            if (callBack)
                callBack(responseModel);
        });
    };
    IBUserService.prototype.updatePassword = function (oldPassword, newPassword, callBack) {
        var endpoint = '/user.json';
        var postDocument = { password: oldPassword, new_password: newPassword };
        this.postRequest(this.createUrl(endpoint), postDocument).subscribe(function (responseModel) {
            if (callBack)
                callBack(responseModel);
        });
    };
    // REALIZA O REGISTRO DO USUARIO
    IBUserService.prototype.createUser = function (userModel, password, facebook_id, callBack) {
        var _this = this;
        var postDocument = userModel.registerUserDocument(password, facebook_id);
        var endpoint = '/user.json';
        this.putRequest(this.createUrl(endpoint), postDocument).subscribe(function (responseModel) {
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                _this.userLoggedIn = true;
                _this.userModel = userModel;
                _this.notifyObservers(observable_module_1.NotifyUpdate.onUser);
                _this.cartService.pullCart();
            }
            if (callBack)
                callBack(responseModel);
        });
    };
    // REALIZA ALTERACAO NOS DADOS DO USUARIO
    IBUserService.prototype.saveUser = function (callBack) {
        var _this = this;
        var postDocument = this.userModel.saveUserDocument();
        var endpoint = '/user.json';
        this.postRequest(this.createUrl(endpoint), postDocument).subscribe(function (responseModel) {
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                _this.notifyObservers(observable_module_1.NotifyUpdate.onUser);
            }
            if (callBack)
                callBack(responseModel);
        });
    };
    IBUserService.prototype.insertCCard = function (ccardModel, callBack) {
        var _this = this;
        var postDocument = ccardModel.registerDocument();
        var endpoint = '/card.json';
        this.putRequest(this.createUrl(endpoint), postDocument).subscribe(function (responseModel) {
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                ccardModel.setData(responseModel.data);
                _this.userModel.insertCCard(ccardModel);
                _this.notifyObservers(observable_module_1.NotifyUpdate.onUser);
            }
            if (callBack)
                callBack(responseModel);
        });
    };
    IBUserService.prototype.deleteCCard = function (ccardModel, callBack) {
        var _this = this;
        var endpoint = '/card.json';
        var args = 'card_id=' + ccardModel.id;
        this.deleteRequest(this.createUrl(endpoint, args)).subscribe(function (responseModel) {
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                _this.userModel.removeCCard(ccardModel);
                _this.notifyObservers(observable_module_1.NotifyUpdate.onUser);
            }
            if (callBack)
                callBack(responseModel);
        });
    };
    IBUserService.prototype.insertAddress = function (addressModel, callBack) {
        var _this = this;
        var postDocument = addressModel.registerDocument();
        var endpoint = '/address.json';
        this.putRequest(this.createUrl(endpoint), postDocument).subscribe(function (responseModel) {
            if (responseModel.status == response_model_1.IBResponseStatus.success) {
                addressModel.id = responseModel.data;
                _this.userModel.insertAddress(addressModel);
            }
            if (callBack)
                callBack(responseModel);
        });
    };
    /** Pede pro servidor remover o endereco do usuario, e depois remove o endereco local, se estiver na lisa */
    IBUserService.prototype.deleteAddress = function (addressModel, callBack) {
        var _this = this;
        var endpoint = '/address.json';
        var args = 'address_id=' + addressModel.id;
        this.deleteRequest(this.createUrl(endpoint, args)).subscribe(function (responseModel) {
            _this.userModel.removeAddress(addressModel);
            _this.notifyObservers(observable_module_1.NotifyUpdate.onUser);
            if (callBack)
                callBack(responseModel);
        });
    };
    IBUserService.prototype.makeZipcodeRequest = function (zipcode, callBack) {
        var url = 'https://api.pagar.me/1/zipcodes/' + zipcode.replace('-', '');
        this.http.get(url).map(function (response) {
            var responseModel;
            if (response.ok) {
                responseModel = new response_model_1.IBResponse({ status: 'success', type: 'dict', data: response.json() });
            }
            else {
                responseModel = new response_model_1.IBResponse({ status: 'error', type: '', data: response.statusText });
            }
            return responseModel;
        }).subscribe(function (responseModel) {
            callBack(responseModel);
        });
    };
    return IBUserService;
}(request_service_1.IBRequestService));
IBUserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, cart_service_1.IBCartService])
], IBUserService);
exports.IBUserService = IBUserService;
//# sourceMappingURL=user.service.js.map