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
var IBStatus = (function () {
    function IBStatus(id) {
        this._STATUS = [
            { 'id': 'ib_wait_auth',
                'title': 'Esperando Autorização',
                'color': 'gainsboro' },
            { 'id': 'ib_declined',
                'title': 'Recusado',
                'color': 'tomato' },
            { 'id': 'ib_confirmed',
                'title': 'Confirmado',
                'color': 'gainsboro' },
            { 'id': 'ib_store_processing',
                'title': 'Processando',
                'color': 'gainsboro' },
            { 'id': 'ib_canceled',
                'title': 'Cancelado',
                'color': 'tomato' },
            { 'id': 'ib_on_the_way',
                'title': 'Pedido a caminho',
                'color': 'gainsboro' },
            { 'id': 'ib_waiting_client',
                'title': 'Aguardando cliente',
                'color': 'gainsboro' },
            { 'id': 'ib_closed',
                'title': 'Finalizado',
                'color': 'turquoise' },
            { 'id': 'ib_pending',
                'title': 'Pendente',
                'color': 'gainsboro' },
            { 'id': 'ib_review_pay',
                'title': 'Pagamento em Revisão',
                'color': 'gainsboro' },
            { 'id': 'ib_fraud_suspect',
                'title': 'Suspeita de Fraude',
                'color': 'tomato' },
            { 'id': 'ib_paid',
                'title': 'Pago',
                'color': 'gainsboro' },
            { 'id': 'pm_processing',
                'title': 'Processando Pagamento',
                'color': 'gainsboro' },
            { 'id': 'pm_authorized',
                'title': 'Pagamento Autorizado',
                'color': 'gainsboro' },
            { 'id': 'pm_paid',
                'title': 'Pago',
                'color': 'gainsboro' },
            { 'id': 'pm_refunded',
                'title': 'Reembolsado',
                'color': 'turquoise' },
            { 'id': 'pm_waiting_payment',
                'title': 'Aguardando pagamento',
                'color': 'gainsboro' },
            { 'id': 'pm_pending_refund',
                'title': 'Reembolso Pendente',
                'color': 'gainsboro' },
            { 'id': 'pm_refused',
                'title': 'Pagamento Recusado',
                'color': 'tomato' },
            { 'id': 'pm_chargedback',
                'title': 'Chargeback',
                'color': 'tomato' }
        ];
        if (id)
            this.setData(id);
    }
    IBStatus.prototype.setData = function (id) {
        for (var i = 0; i < this._STATUS.length; i++) {
            if (this._STATUS[i].id == id) {
                this.id = this._STATUS[i].id;
                this.title = this._STATUS[i].title;
                this.color = this._STATUS[i].color;
            }
        }
    };
    return IBStatus;
}());
exports.IBStatus = IBStatus;
var IBProductOrder = (function (_super) {
    __extends(IBProductOrder, _super);
    function IBProductOrder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IBProductOrder.prototype.total = function () {
        return this.qtd * this.price;
    };
    return IBProductOrder;
}(object_model_1.IBObject));
exports.IBProductOrder = IBProductOrder;
var IBCombinationOrder = (function (_super) {
    __extends(IBCombinationOrder, _super);
    function IBCombinationOrder(data) {
        var _this = _super.call(this) || this;
        _this.setData(data);
        return _this;
    }
    IBCombinationOrder.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
    };
    IBCombinationOrder.prototype.totalPrice = function () {
        return this.quantity * this.price;
    };
    IBCombinationOrder.prototype.getIngredientsText = function () {
        var finalString = "";
        this.bundles.forEach(function (bundle) {
            var mString = '';
            bundle.ingredients.forEach(function (ingredient) {
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
            finalString = finalString + mString;
        });
        return finalString;
    };
    return IBCombinationOrder;
}(object_model_1.IBObject));
exports.IBCombinationOrder = IBCombinationOrder;
var IBProductsKitOrder = (function (_super) {
    __extends(IBProductsKitOrder, _super);
    function IBProductsKitOrder(data) {
        var _this = _super.call(this) || this;
        _this.setData(data);
        return _this;
    }
    IBProductsKitOrder.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
    };
    IBProductsKitOrder.prototype.totalPrice = function () {
        return this.qtd * this.price;
    };
    IBProductsKitOrder.prototype.getIngredientsText = function () {
        var finalString = "";
        this.bundles.forEach(function (bundle) {
            var mString = '';
            bundle.products.forEach(function (ingredient) {
                if (ingredient.qtd > 0) {
                    if (mString != '')
                        mString = mString + ', ';
                    if (ingredient.qtd == 1)
                        mString = mString + ingredient.name;
                    else
                        return ingredient.qtd + ' ' + ingredient.name;
                }
            });
            if (mString != '')
                mString = mString + '. ';
            finalString = finalString + mString;
        });
        return finalString;
    };
    return IBProductsKitOrder;
}(object_model_1.IBObject));
exports.IBProductsKitOrder = IBProductsKitOrder;
var IBProductsKitBundleOrder = (function (_super) {
    __extends(IBProductsKitBundleOrder, _super);
    function IBProductsKitBundleOrder(data) {
        var _this = _super.call(this) || this;
        _this.setData(data);
        return _this;
    }
    IBProductsKitBundleOrder.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        this.products = [];
        for (var i = 0; i < data['products'].length; i++) {
            this.products.push(new IBProductsKitBundleProductsOrder(data['products'][i]));
        }
    };
    return IBProductsKitBundleOrder;
}(object_model_1.IBObject));
exports.IBProductsKitBundleOrder = IBProductsKitBundleOrder;
var IBProductsKitBundleProductsOrder = (function (_super) {
    __extends(IBProductsKitBundleProductsOrder, _super);
    function IBProductsKitBundleProductsOrder(data) {
        var _this = _super.call(this) || this;
        _this.setData(data);
        return _this;
    }
    IBProductsKitBundleProductsOrder.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
    };
    return IBProductsKitBundleProductsOrder;
}(object_model_1.IBObject));
exports.IBProductsKitBundleProductsOrder = IBProductsKitBundleProductsOrder;
var IBOrder = (function (_super) {
    __extends(IBOrder, _super);
    function IBOrder(data) {
        var _this = _super.call(this) || this;
        _this.setData(data);
        return _this;
    }
    IBOrder.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        this.products = [];
        if (data['products']) {
            for (var i = 0; i < data['products'].length; i++) {
                this.products.push(new IBProductOrder(data['products'][i]));
            }
        }
        this.kits = [];
        if (data['kits']) {
            for (var i = 0; i < data['kits'].length; i++) {
                this.kits.push(new IBProductsKitOrder(data['kits'][i]));
            }
        }
        this.combinations = [];
        if (data['combinations']) {
            for (var i = 0; i < data['combinations'].length; i++) {
                this.combinations.push(new IBCombinationOrder(data['combinations'][i]));
            }
        }
        this.status = undefined;
        if (data['status']) {
            this.status = new IBStatus(data['status']);
        }
        if (this.created_at) {
            this.created_at = dateutil_model_1.IBDateUtil.getDate(data['created_at']);
        }
    };
    IBOrder.prototype.subtotal = function () {
        var sum = 0;
        var length = this.products.length;
        for (var i = 0; i < this.products.length; i++) {
            sum += Number(this.products[i].qtd) * Number(this.products[i].price);
        }
        for (var i = 0; i < this.combinations.length; i++) {
            sum += Number(this.combinations[i].quantity * Number(this.combinations[i].price));
        }
        for (var i = 0; i < this.kits.length; i++) {
            sum += Number(this.kits[i].qtd * Number(this.kits[i].price));
        }
        return sum;
    };
    IBOrder.prototype.installmentTax = function () {
        if (this.installment && this.installment.interest > 0) {
            var total = this.subtotal() + this.deliveryTax() - this.discount();
            var totalWithInterest = total * Math.pow(1 + this.installment.interest / 100.0, this.installment.qtd);
            return totalWithInterest - total;
        }
        else
            return 0;
    };
    IBOrder.prototype.deliveryTax = function () {
        if (this.delivery_info && this.delivery_tax)
            return this.delivery_tax;
        else
            return 0;
    };
    IBOrder.prototype.discount = function () {
        if (!this.coupon)
            return 0;
        else {
            if (this.coupon.coupon_type == 'deli_free')
                return this.deliveryTax();
            else if (this.coupon.coupon_type == 'buy_fixe')
                return this.coupon.value;
            else
                return (this.coupon.value / 100.0) * this.subtotal();
        }
    };
    IBOrder.prototype.total = function () {
        return this.subtotal() + this.deliveryTax() - this.discount() + this.installmentTax();
    };
    IBOrder.prototype.labelBuyType = function () {
        if (this.buy_type == 'deli')
            return 'Delivery';
        if (this.buy_type == 'coll')
            return 'Coletar na loja';
        return '';
    };
    IBOrder.prototype.labelPayment = function () {
        if (this.payment_info.method == 'credit')
            return "Crédito";
        if (this.payment_info.method == 'debit')
            return "Débito";
        if (this.payment_info.method == 'cash')
            return "Dinheiro";
        if (this.payment_info.method == 'check')
            return "Cheque";
        if (this.payment_info.method == 'billet')
            return "Boleto bancário";
        if (this.payment_info.method == 'pm_online')
            return "Pagamento Online";
        if (this.payment_info.method == 'deposit')
            return "Depósito Bancário";
        return '';
    };
    return IBOrder;
}(object_model_1.IBObject));
exports.IBOrder = IBOrder;
