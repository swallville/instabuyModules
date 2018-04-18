"use strict";
var util_model_1 = require("./util.model");
var IBNotifyItemIdentifier = (function () {
    function IBNotifyItemIdentifier() {
    }
    return IBNotifyItemIdentifier;
}());
exports.IBNotifyItemIdentifier = IBNotifyItemIdentifier;
// export interface IBItemsObserver {
//     productUpdated(product: IBNotifyProductIdentifier): void;
// }
var IBItemsObservable = (function () {
    function IBItemsObservable() {
        this.observers = [];
    }
    IBItemsObservable.prototype.subscribe = function (observer) {
        if (this.observers.indexOf(observer) == -1)
            this.observers.push(observer);
    };
    IBItemsObservable.prototype.unsubscribe = function (observer) {
        util_model_1.IBUtil.removeObjectFromArray(this.observers, observer);
    };
    IBItemsObservable.prototype.notifyObservers = function (notify) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            if (observer.id == notify.id) {
                if (observer.item_type == 'product') {
                    var product = observer;
                    for (var _b = 0, _c = product.prices; _b < _c.length; _b++) {
                        var price = _c[_b];
                        if (notify.model_id && notify.model_id == price.id) {
                            price.qtdOnCart = notify.qtd;
                            break;
                        }
                    }
                }
            }
        }
    };
    return IBItemsObservable;
}());
exports.IBItemsObservable = IBItemsObservable;
