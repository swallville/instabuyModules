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
var IBCategory = (function (_super) {
    __extends(IBCategory, _super);
    function IBCategory(data) {
        var _this = _super.call(this) || this;
        _this.setData(data);
        return _this;
    }
    return IBCategory;
}(object_model_1.IBObject));
exports.IBCategory = IBCategory;
var IBSubCategory = (function (_super) {
    __extends(IBSubCategory, _super);
    function IBSubCategory(data) {
        var _this = _super.call(this) || this;
        _this.setData(data);
        return _this;
    }
    return IBSubCategory;
}(object_model_1.IBObject));
exports.IBSubCategory = IBSubCategory;
//# sourceMappingURL=category.model.js.map