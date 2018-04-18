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
var product_model_1 = require("./product.model");
var productskit_model_1 = require("./productskit.model");
var IBLayout = (function (_super) {
    __extends(IBLayout, _super);
    function IBLayout(data) {
        var _this = _super.call(this) || this;
        _this.setData(data);
        return _this;
    }
    IBLayout.prototype.setData = function (data) {
        this.data = data;
        if (data['collection_items']) {
            this.setCollection(data['collection_items']);
        }
        if (data['promo']) {
            this.setPromotions(data['promo']);
        }
        if (data['banners']) {
            this.setBanners(data['banners']);
        }
    };
    IBLayout.prototype.setCollection = function (collections) {
        this.collection = new Array();
        var category;
        var aux_items;
        for (var i = 0; i < collections.length; i++) {
            category = {
                id: collections[i]['id'],
                title: collections[i]['title'],
                items: new Array()
            };
            aux_items = collections[i]['items'];
            for (var j = 0; j < aux_items.length; j++) {
                var obj = aux_items[j];
                if (obj['item_type'] == 'product')
                    category.items.push(new product_model_1.IBProduct(obj));
                else if (obj['item_type'] == 'products_kit')
                    category.items.push(new productskit_model_1.IBProductsKit(obj));
            }
            this.collection.push(category);
        }
    };
    IBLayout.prototype.setPromotions = function (promotions) {
        this.promotions = new Array();
        var item;
        for (var i = 0; (i < promotions.length); i++) {
            item = promotions[i];
            if (item['item_type'] == 'product')
                this.promotions.push(new product_model_1.IBProduct(item));
            else if (item['item_type'] == 'products_kit')
                this.promotions.push(new productskit_model_1.IBProductsKit(item));
        }
    };
    IBLayout.prototype.setBanners = function (banners) {
        this.banners = new Array();
        var item;
        for (var i = 0; (i < banners.length) && (i < 8); i++) {
            item = {
                image: banners[i]['image'],
                link: banners[i]['link'],
                title: banners[i]['title']
            };
            this.banners.push(item);
        }
    };
    return IBLayout;
}(object_model_1.IBObject));
exports.IBLayout = IBLayout;
//# sourceMappingURL=layout.model.js.map