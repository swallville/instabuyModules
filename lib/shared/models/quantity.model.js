"use strict";
var general_module_1 = require("../modules/general.module");
var IBQuantity = (function () {
    function IBQuantity(value, updatedAt) {
        this.value = value;
        this.updatedAt = updatedAt;
        if (value == undefined)
            this.value = 0;
        if (updatedAt == undefined)
            this.updatedAt = new Date();
    }
    IBQuantity.prototype.qtd = function (value) {
        if (value != undefined) {
            value = general_module_1.fixFloatPoint(value);
            this.value = value;
            this.updatedAt = new Date();
        }
        else {
            return this.value;
        }
    };
    return IBQuantity;
}());
exports.IBQuantity = IBQuantity;
