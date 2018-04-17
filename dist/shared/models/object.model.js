"use strict";
var IBObject = (function () {
    function IBObject(data) {
        if (!data)
            data = {};
        if (Object.keys(data).length > 0)
            this.setData(data);
    }
    IBObject.prototype.setData = function (data) {
        for (var field in data) {
            this[field] = data[field];
        }
        this.data = data;
    };
    IBObject.prototype.get = function (field) {
        return this.data[field];
    };
    return IBObject;
}());
exports.IBObject = IBObject;
//# sourceMappingURL=object.model.js.map