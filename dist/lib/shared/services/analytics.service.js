"use strict";
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
var IBAnalytics = (function () {
    function IBAnalytics() {
    }
    IBAnalytics.prototype.init = function (storeModel) {
        ga('create', 'UA-110676803-1', 'auto');
        if (storeModel.google_analytics_key)
            ga('create', storeModel.google_analytics_key, 'auto', 'clientTracker');
        fbq('init', '598552787198962');
        if (storeModel.fb_pixel_key)
            fbq('init', storeModel.fb_pixel_key);
        fbq('track', 'PageView');
    };
    IBAnalytics.prototype.pageView = function (url) {
        ga('set', 'page', url);
        ga('clientTracker.set', 'page', url);
        ga('send', 'pageview');
        ga('clientTracker.send', 'pageview');
        fbq('track', 'PageView');
    };
    IBAnalytics.prototype.userRegistered = function () {
        fbq('track', 'CompleteRegistration');
    };
    IBAnalytics.prototype.userRegisterStarted = function () {
        fbq('track', 'Lead');
    };
    IBAnalytics.prototype.startCheckout = function () {
        fbq('track', 'InitiateCheckout');
    };
    IBAnalytics.prototype.buyFinished = function (buyValue) {
        fbq('track', 'Purchase', {
            value: buyValue,
            currency: 'BRL',
        });
    };
    IBAnalytics.prototype.addToCart = function (value, id, type) {
        fbq('track', 'AddToCart', {
            value: value,
            currency: 'BRL',
            content_ids: id,
            content_type: type,
        });
    };
    IBAnalytics.prototype.search = function (search, store_name) {
        fbq('track', 'Search', {
            search_string: search,
            content_ids: store_name,
        });
    };
    return IBAnalytics;
}());
IBAnalytics = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], IBAnalytics);
exports.IBAnalytics = IBAnalytics;
//# sourceMappingURL=analytics.service.js.map