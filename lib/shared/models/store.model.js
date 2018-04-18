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
var layout_model_1 = require("./layout.model");
var general_module_1 = require("../modules/general.module");
var dateutil_model_1 = require("./dateutil.model");
var IBStoreHours = (function (_super) {
    __extends(IBStoreHours, _super);
    function IBStoreHours() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IBStoreHours.prototype.setData = function (data) {
        var element;
        // issue: https://github.com/Microsoft/TypeScript/pull/14195
        // for..in has to be placed like Object
        // TODO: fix
        for (var key in Object(data)) {
            element = data[key];
            if (element['24h']) {
                element['allDay'] = element['24h'];
                delete element['24h'];
            }
            this[key] = element;
        }
    };
    return IBStoreHours;
}(object_model_1.IBObject));
exports.IBStoreHours = IBStoreHours;
var IBDayEnum;
(function (IBDayEnum) {
    IBDayEnum[IBDayEnum["sunday"] = 0] = "sunday";
    IBDayEnum[IBDayEnum["monday"] = 1] = "monday";
    IBDayEnum[IBDayEnum["tuesday"] = 2] = "tuesday";
    IBDayEnum[IBDayEnum["wednesday"] = 3] = "wednesday";
    IBDayEnum[IBDayEnum["thursday"] = 4] = "thursday";
    IBDayEnum[IBDayEnum["friday"] = 5] = "friday";
    IBDayEnum[IBDayEnum["saturday"] = 6] = "saturday"; // sabado
})(IBDayEnum = exports.IBDayEnum || (exports.IBDayEnum = {}));
var IBScheduleBand = (function (_super) {
    __extends(IBScheduleBand, _super);
    function IBScheduleBand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IBScheduleBand.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        if (this.delivery_date)
            this.delivery_date = dateutil_model_1.IBDateUtil.getDate(data['delivery_date']);
    };
    return IBScheduleBand;
}(object_model_1.IBObject));
exports.IBScheduleBand = IBScheduleBand;
var IBScheduleDay = (function (_super) {
    __extends(IBScheduleDay, _super);
    function IBScheduleDay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IBScheduleDay.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        this.bands = [];
        for (var i = 0; i < data['bands'].length; i++) {
            this.bands.push(new IBScheduleBand(data['bands'][i]));
        }
    };
    return IBScheduleDay;
}(object_model_1.IBObject));
exports.IBScheduleDay = IBScheduleDay;
var IBStoreLocality = (function (_super) {
    __extends(IBStoreLocality, _super);
    function IBStoreLocality() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IBStoreLocality;
}(object_model_1.IBObject));
exports.IBStoreLocality = IBStoreLocality;
var IBStoreCard = (function (_super) {
    __extends(IBStoreCard, _super);
    function IBStoreCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IBStoreCard;
}(object_model_1.IBObject));
exports.IBStoreCard = IBStoreCard;
var IBInstallment = (function (_super) {
    __extends(IBInstallment, _super);
    function IBInstallment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IBInstallment.prototype.isValid = function (price) {
        if (price >= this.min_price)
            return true;
        else
            return false;
    };
    IBInstallment.prototype.getFinalPriceWithInstallment = function (price) {
        return (price * Math.pow(1 + (this.interest) / 100, Number(this.installments.substring(0, 1))));
    };
    IBInstallment.prototype.getFinalInstallment = function (price) {
        return this.getFinalPriceWithInstallment(price) / Number(this.installments.substring(0, 1));
    };
    IBInstallment.prototype.getFinalInstallmentString = function (price) {
        var installment_string = '';
        installment_string += this.installments;
        if (this.interest == 0)
            installment_string += ' sem juros de ';
        else
            installment_string += ' com juros (' + this.interest + '% ao mês) de ';
        installment_string += 'R$ ' + general_module_1.priceToString(this.getFinalInstallment(price));
        return installment_string;
    };
    return IBInstallment;
}(object_model_1.IBObject));
exports.IBInstallment = IBInstallment;
var IBPage = (function (_super) {
    __extends(IBPage, _super);
    function IBPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IBPage;
}(object_model_1.IBObject));
exports.IBPage = IBPage;
var IBStore = (function (_super) {
    __extends(IBStore, _super);
    function IBStore(data) {
        var _this = _super.call(this) || this;
        _this.layout = new layout_model_1.IBLayout([]);
        _this.menu = [];
        _this.loc = [];
        _this.localities = [];
        _this.available_deliveries = [];
        _this.acceptedCards = [];
        _this.creditList = [];
        _this.debitList = [];
        _this.valeList = [];
        _this.installmentsrules = [];
        if (data)
            _this.setData(data);
        return _this;
    }
    IBStore.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        if (data['localities']) {
            this.localities = [];
            for (var i = 0; i < data['localities'].length; i++) {
                this.localities.push(new IBStoreLocality(data['localities'][i]));
            }
        }
        if (data['available_deliveries']) {
            this.available_deliveries = [];
            for (var i = 0; i < data['available_deliveries'].length; i++) {
                this.available_deliveries.push(new IBScheduleDay(data['available_deliveries'][i]));
            }
        }
        if (data['acceptedCards']) {
            this.acceptedCards = [];
            for (var i = 0; i < data['acceptedCards'].length; i++) {
                this.acceptedCards.push(new IBStoreCard(data['acceptedCards'][i]));
            }
            var auxStoreCard = void 0;
            this.debitList = [];
            this.creditList = [];
            this.valeList = [];
            for (var i = 0; i < this.acceptedCards.length; i++) {
                auxStoreCard = this.acceptedCards[i];
                if (auxStoreCard.isDebit) {
                    this.debitList.push(auxStoreCard);
                }
                if (auxStoreCard.isCredit) {
                    this.creditList.push(auxStoreCard);
                }
                if (auxStoreCard.isVale) {
                    this.valeList.push(auxStoreCard);
                }
            }
        }
        this.offlinePayment = false;
        if (data['offlinePayment'] && this.acceptedCards.length) {
            this.offlinePayment = true;
        }
        if (data['installmentsrules']) {
            this.installmentsrules = [];
            for (var i = 0; i < data['installmentsrules'].length; i++) {
                this.installmentsrules.push(new IBInstallment(data['installmentsrules'][i]));
            }
        }
        if (data['pages']) {
            this.pages = [];
            for (var i = 0; i < data['pages'].length; i++) {
                this.pages.push(new IBPage(data['pages'][i]));
            }
        }
    };
    IBStore.prototype.setMainMenu = function (menu) {
        this.menu = [];
        var menuCategoryInterface;
        var menuSubInterface;
        var subCategories;
        for (var i = 0; i < menu.length; i++) {
            menuCategoryInterface = {
                id: menu[i]['id'],
                title: menu[i]['title'],
                subCategories: []
            };
            subCategories = menu[i]['sub_categories'];
            for (var j = 0; j < subCategories.length; j++) {
                menuSubInterface = {
                    id: subCategories[j]['id'],
                    title: subCategories[j]['title']
                };
                menuCategoryInterface.subCategories.push(menuSubInterface);
            }
            this.menu.push(menuCategoryInterface);
        }
    };
    IBStore.prototype.getCategory = function (categoryId) {
        for (var i = 0; i < this.menu.length; i++) {
            if (categoryId == this.menu[i].id) {
                return this.menu[i];
            }
        }
    };
    IBStore.prototype.getPage = function (pageUrl) {
        for (var i = 0; i < this.pages.length; i++) {
            if (pageUrl == this.pages[i].url_name) {
                return this.pages[i];
            }
        }
    };
    IBStore.prototype.getMedia = function (media) {
        var searchMedia = '';
        if (media == 'facebook') {
            searchMedia = 'facebook_media';
        }
        if (media == 'instagram') {
            searchMedia = 'instagram_media';
        }
        if (media == 'twitter') {
            searchMedia = 'twitter_media';
        }
        if (media == 'google+') {
            searchMedia = 'googlePlus_media';
        }
        for (var i = 0; i < this.medias.length; i++) {
            if (this.medias[i][searchMedia]) {
                return this.medias[i][searchMedia];
            }
        }
        return undefined;
    };
    return IBStore;
}(object_model_1.IBObject));
exports.IBStore = IBStore;
