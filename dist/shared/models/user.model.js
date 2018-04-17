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
var general_module_1 = require("../modules/general.module");
var ccard_model_1 = require("./ccard.model");
var address_model_1 = require("./address.model");
var coupon_model_1 = require("./coupon.model");
var order_model_1 = require("./order.model");
var general_module_2 = require("../modules/general.module");
var IBUser = (function (_super) {
    __extends(IBUser, _super);
    function IBUser() {
        var _this = _super.call(this) || this;
        _this.cards = [];
        _this.addresses = [];
        _this.coupons = [];
        _this.orders = [];
        _this.recentOrders = 0;
        _this.validateEmail = general_module_1.validateEmail;
        _this.reverseBirthday = general_module_2.reverseBirthday;
        _this.addresses = [];
        return _this;
    }
    IBUser.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
    };
    IBUser.prototype.setOrders = function (orders) {
        this.orders = [];
        for (var i = 0; i < orders.length; i++) {
            this.orders.push(new order_model_1.IBOrder(orders[i]));
        }
        this.recentOrders = 0;
        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        for (var i = 0; i < this.orders.length; i++) {
            if (oneWeekAgo < this.orders[i].created_at) {
                this.recentOrders++;
            }
        }
    };
    IBUser.prototype.setCards = function (cards) {
        this.cards = [];
        for (var i = 0; i < cards.length; i++) {
            this.cards.push(new ccard_model_1.IBCard(cards[i]));
        }
    };
    IBUser.prototype.setAddresses = function (addresses) {
        this.addresses = [];
        for (var i = 0; i < addresses.length; i++) {
            this.addresses.push(new address_model_1.IBAddress(addresses[i]));
        }
    };
    IBUser.prototype.setCoupons = function (coupons) {
        this.coupons = [];
        for (var i = 0; i < coupons.length; i++) {
            if (!coupons[i]['code'] || coupons[i]['code'] == null || coupons[i]['code'] == '')
                continue;
            this.coupons.push(new coupon_model_1.IBCoupon(coupons[i]));
        }
    };
    IBUser.prototype.getPhoto = function () {
        if (this.photo)
            return this.photo;
        if (this.gender == 'F') {
            return "https://s3-sa-east-1.amazonaws.com/ibbucket.img/default-user-female.jpg";
        }
        else {
            return "https://s3-sa-east-1.amazonaws.com/ibbucket.img/default-user-male.jpg";
        }
    };
    IBUser.prototype.registerUserDocument = function (password, facebookId) {
        var newUserDocument = {};
        newUserDocument['email'] = this.email;
        newUserDocument['fName'] = this.fName;
        newUserDocument['lName'] = this.lName;
        newUserDocument['gender'] = this.gender;
        newUserDocument['birthday'] = general_module_2.reverseBirthday(this.birthday);
        newUserDocument['cpf'] = this.cpf;
        newUserDocument['phone'] = this.phone;
        if (password) {
            newUserDocument['password'] = password;
        }
        else {
            newUserDocument['facebook_id'] = facebookId;
        }
        return newUserDocument;
    };
    IBUser.prototype.saveUserDocument = function () {
        var userDocument = {};
        userDocument['fName'] = this.fName;
        userDocument['lName'] = this.lName;
        userDocument['gender'] = this.gender;
        userDocument['birthday'] = this.birthday;
        userDocument['cpf'] = this.cpf;
        userDocument['phone'] = this.phone;
        return userDocument;
    };
    IBUser.prototype.insertAddress = function (address) {
        this.addresses.push(address);
    };
    IBUser.prototype.removeAddress = function (address) {
        var index = this.addresses.indexOf(address);
        if (index >= 0)
            this.addresses.splice(index, 1);
    };
    IBUser.prototype.insertCCard = function (ccard) {
        this.cards.push(ccard);
    };
    IBUser.prototype.removeCCard = function (ccard) {
        var index = this.cards.indexOf(ccard);
        if (index >= 0)
            this.cards.splice(index, 1);
    };
    IBUser.prototype.getAddress = function (addressId) {
        for (var i = 0; i < this.addresses.length; i++) {
            if (this.addresses[i].id == addressId)
                return this.addresses[i];
        }
    };
    IBUser.prototype.getCard = function (cardId) {
        for (var i = 0; i < this.cards.length; i++) {
            if (this.cards[i].id == cardId)
                return this.cards[i];
        }
    };
    IBUser.prototype.getCoupon = function (code) {
        for (var i = 0; i < this.coupons.length; i++) {
            if (this.coupons[i].code == code)
                return this.coupons[i];
        }
    };
    IBUser.prototype.getOrder = function (code) {
        for (var i = 0; i < this.orders.length; i++) {
            if (this.orders[i].code == code)
                return this.orders[i];
        }
    };
    return IBUser;
}(object_model_1.IBObject));
exports.IBUser = IBUser;
//# sourceMappingURL=user.model.js.map