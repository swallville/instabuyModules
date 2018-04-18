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
var IBCard = (function (_super) {
    __extends(IBCard, _super);
    function IBCard(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        _super.prototype.setData.call(_this, data);
        return _this;
    }
    IBCard.prototype.registerDocument = function () {
        var ccardDocument = {};
        ccardDocument['card_hash'] = this.card_hash;
        ccardDocument['validate'] = this.validate;
        if (this.address_id) {
            ccardDocument['address_id'] = this.address_id;
        }
        else {
            ccardDocument['zipcode'] = this.address.zipcode;
            ccardDocument['country'] = this.address.country;
            ccardDocument['state'] = this.address.state;
            ccardDocument['city'] = this.address.city;
            ccardDocument['neighborhood'] = this.address.neighborhood;
            ccardDocument['street'] = this.address.street;
            ccardDocument['street_number'] = this.address.street_number;
            ccardDocument['complement'] = this.address.complement;
        }
        return ccardDocument;
    };
    return IBCard;
}(object_model_1.IBObject));
exports.IBCard = IBCard;
