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
var IBCombination = (function (_super) {
    __extends(IBCombination, _super);
    function IBCombination(data) {
        var _this = _super.call(this) || this;
        _this.quantity = 1;
        _this.setData(data);
        return _this;
    }
    IBCombination.prototype.setData = function (data) {
        if (data && Object.keys(data).length > 0) {
            _super.prototype.setData.call(this, data);
            this.bundles = [];
            var length_1 = data['bundles'].length;
            if (data['bundles'] && length_1 > 0) {
                for (var i = 0; i < length_1; i++) {
                    this.bundles.push(new IBCombinationBundle(data['bundles'][i]));
                }
            }
        }
    };
    IBCombination.prototype.getPrice = function () {
        var total = this.price;
        for (var _i = 0, _a = this.bundles; _i < _a.length; _i++) {
            var bundle = _a[_i];
            for (var _b = 0, _c = bundle.ingredients; _b < _c.length; _b++) {
                var ingredient = _c[_b];
                total = total + (ingredient.price * ingredient.quantity);
            }
        }
        return total;
    };
    IBCombination.prototype.getTotalPrice = function () {
        return this.getPrice() * this.quantity;
    };
    IBCombination.prototype.getBundlesForCartRequest = function () {
        var mArray = [];
        this.bundles.forEach(function (bundle) {
            var dict = { id: bundle.id };
            var mArrayIng = [];
            bundle.ingredients.forEach(function (ingredient) {
                if (ingredient.quantity > 0) {
                    mArrayIng.push({
                        id: ingredient.id,
                        quantity: ingredient.quantity
                    });
                }
            });
            dict['ingredients'] = mArrayIng;
            if (mArrayIng.length && mArrayIng.length != 0)
                mArray.push(dict);
        });
        return mArray;
    };
    IBCombination.prototype.getIngredientsText = function () {
        var mString = "";
        this.bundles.forEach(function (bundle) {
            mString = mString + bundle.textForIngredients();
        });
        return mString;
    };
    IBCombination.prototype.getFinishBuyJSON = function () {
        return {
            id: this.id,
            quantity: this.quantity,
            price: this.getPrice()
        };
    };
    IBCombination.prototype.getVisiblePriceString = function () {
        if (this.min_price == this.price)
            return 'R$ ' + this.price.toFixed(2).toString().replace('.', ',');
        else
            return 'A partir de R$ ' + this.min_price.toFixed(2).toString().replace('.', ',');
    };
    return IBCombination;
}(object_model_1.IBObject));
exports.IBCombination = IBCombination;
var IBCombinationBundle = (function (_super) {
    __extends(IBCombinationBundle, _super);
    function IBCombinationBundle(data) {
        var _this = _super.call(this) || this;
        _this.setData(data);
        return _this;
    }
    IBCombinationBundle.prototype.hasIngredientSelected = function () {
        for (var _i = 0, _a = this.ingredients; _i < _a.length; _i++) {
            var ing = _a[_i];
            if (ing.quantity && ing.quantity > 0)
                return true;
        }
        return false;
    };
    IBCombinationBundle.prototype.setData = function (data) {
        if (data && Object.keys(data).length > 0) {
            _super.prototype.setData.call(this, data);
            this.ingredients = [];
            var length_2 = data['ingredients'].length;
            if (data['ingredients'] && length_2 > 0) {
                for (var i = 0; i < length_2; i++) {
                    this.ingredients.push(new IBCombinationBundleIngredient(data['ingredients'][i]));
                }
            }
        }
    };
    IBCombinationBundle.prototype.numberOfIngredients = function () {
        var count = 0;
        this.ingredients.forEach(function (ingr) {
            if (ingr.quantity > 0) {
                count++;
            }
        });
        return count;
    };
    IBCombinationBundle.prototype.numberOfItens = function () {
        var count = 0;
        this.ingredients.forEach(function (ingr) {
            if (ingr.quantity > 0) {
                count += ingr.quantity;
            }
        });
        return count;
    };
    IBCombinationBundle.prototype.textForIngredientAtPosition = function (index) {
        var count = 0;
        this.ingredients.forEach(function (ingredient) {
            if (ingredient.quantity > 0) {
                if (index == count && ingredient.quantity == 1)
                    return ingredient.name;
                else if (index == count && ingredient.quantity > 1)
                    return ingredient.quantity + ' ' + ingredient.name;
                else
                    count++;
            }
        });
        return "";
    };
    IBCombinationBundle.prototype.textForIngredients = function () {
        var mString = '';
        this.ingredients.forEach(function (ingredient) {
            if (ingredient.quantity > 0) {
                if (mString != '')
                    mString = mString + ', ';
                if (ingredient.quantity == 1)
                    mString = mString + ingredient.name;
                else
                    return ingredient.quantity + ' ' + ingredient.name;
            }
        });
        if (mString != '')
            mString = mString + '. ';
        return mString;
    };
    IBCombinationBundle.prototype.setIngredientAtIndexSelected = function (index) {
        var length = this.ingredients.length;
        for (var i = 0; i < length; i++) {
            var ingredient = this.ingredients[i];
            if (i == index)
                ingredient.quantity = 1;
            else
                ingredient.quantity = 0;
        }
    };
    return IBCombinationBundle;
}(object_model_1.IBObject));
exports.IBCombinationBundle = IBCombinationBundle;
var IBCombinationBundleIngredient = (function (_super) {
    __extends(IBCombinationBundleIngredient, _super);
    function IBCombinationBundleIngredient(data) {
        var _this = _super.call(this) || this;
        _this.quantity = 0; //qtd selected
        _this.setData(data);
        return _this;
    }
    IBCombinationBundleIngredient.prototype.textForIngredient = function () {
        if (this.quantity == 1)
            return this.name;
        else if (this.quantity > 1)
            return this.quantity + 'x ' + this.name;
        else
            return "";
    };
    return IBCombinationBundleIngredient;
}(object_model_1.IBObject));
exports.IBCombinationBundleIngredient = IBCombinationBundleIngredient;
//# sourceMappingURL=combination.model.js.map