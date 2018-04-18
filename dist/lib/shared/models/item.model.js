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
var dateutil_model_1 = require("./dateutil.model");
var IBItem = (function (_super) {
    __extends(IBItem, _super);
    function IBItem(data) {
        var _this = _super.call(this) || this;
        if (Object.keys(data).length > 0)
            _this.setData(data);
        return _this;
    }
    IBItem.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        this.created_at = dateutil_model_1.IBDateUtil.getDate(data['created_at']);
        this.last_modified = dateutil_model_1.IBDateUtil.getDate(data['last_modified']);
        if (data['subcategory_id'] && data['subcategory_id']['title']) {
            this.subcategory_id = data['subcategory_id']['id'];
            this.subcategory_name = data['subcategory_id']['title'];
            this.category_id = data['subcategory_id']['category_id']['id'];
            this.category_name = data['subcategory_id']['category_id']['title'];
        }
    };
    IBItem.prototype.qtdBadge = function () {
        return 0;
    };
    return IBItem;
}(object_model_1.IBObject));
exports.IBItem = IBItem;
//# sourceMappingURL=item.model.js.map