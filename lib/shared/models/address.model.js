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
var IBAddress = (function (_super) {
    __extends(IBAddress, _super);
    function IBAddress(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        _super.prototype.setData.call(_this, data);
        return _this;
    }
    IBAddress.prototype.registerDocument = function () {
        var addressDocument = {};
        addressDocument['label'] = this.label;
        addressDocument['zipcode'] = this.zipcode;
        addressDocument['country'] = this.country;
        addressDocument['state'] = this.state;
        addressDocument['city'] = this.city;
        addressDocument['neighborhood'] = this.neighborhood;
        addressDocument['street'] = this.street;
        addressDocument['street_number'] = this.street_number;
        addressDocument['complement'] = this.complement;
        return addressDocument;
    };
    return IBAddress;
}(object_model_1.IBObject));
exports.IBAddress = IBAddress;
