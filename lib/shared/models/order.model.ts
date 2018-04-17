import { IBObject } from "./object.model";

import { IBCoupon } from "./coupon.model";
import { IBScheduleBand } from "./store.model";

import { IBCombinationBundle} from "./combination.model";
import { IBDateUtil } from './dateutil.model';


export class IBStatus {
    private _STATUS:Array<{id:string, title:string, color:string}> = [
		{'id':'ib_wait_auth',
			'title':'Esperando Autorização',
			'color':'gainsboro'},
		{'id':'ib_declined',
			'title':'Recusado',
			'color':'tomato'},
		{'id':'ib_confirmed',
			'title':'Confirmado',
			'color':'gainsboro'},
		{'id':'ib_store_processing',
			'title':'Processando',
			'color':'gainsboro'},
		{'id':'ib_canceled',
			'title':'Cancelado',
			'color':'tomato'},
		{'id':'ib_on_the_way',
			'title':'Pedido a caminho',
			'color':'gainsboro'},
		{'id':'ib_waiting_client',
			'title':'Aguardando cliente',
			'color':'gainsboro'},
		{'id':'ib_closed',
			'title':'Finalizado',
			'color':'turquoise'},
		{'id':'ib_pending',
			'title':'Pendente',
			'color':'gainsboro'},
		{'id':'ib_review_pay',
			'title':'Pagamento em Revisão',
			'color':'gainsboro'},
		{'id':'ib_fraud_suspect',
			'title':'Suspeita de Fraude',
            'color':'tomato'},
        {'id':'ib_paid',
        'title':'Pago',
        'color':'gainsboro'},

		{'id':'pm_processing',
			'title':'Processando Pagamento',
			'color':'gainsboro'},
		{'id':'pm_authorized',
			'title':'Pagamento Autorizado',
			'color':'gainsboro'},
		{'id':'pm_paid',
			'title':'Pago',
			'color':'gainsboro'},
		{'id':'pm_refunded',
			'title':'Reembolsado',
			'color':'turquoise'},
		{'id':'pm_waiting_payment',
			'title':'Aguardando pagamento',
			'color':'gainsboro'},
		{'id':'pm_pending_refund',
			'title':'Reembolso Pendente',
			'color':'gainsboro'},
		{'id':'pm_refused',
			'title':'Pagamento Recusado',
			'color':'tomato'},
		{'id':'pm_chargedback',
			'title':'Chargeback',
			'color':'tomato'}
	];

    id:string;
    title:string;
    color:string;

    constructor(id?:string) {
        if (id) this.setData(id);
    }

    setData(id:string):void{
        for (let i = 0; i < this._STATUS.length; i++) {
            if (this._STATUS[i].id == id) {
                this.id = this._STATUS[i].id;
                this.title = this._STATUS[i].title;
                this.color = this._STATUS[i].color;
            }
        }
    }
}

export class IBProductOrder extends IBObject {
    id:string;
    model_id:string;
    status:number;
    model_internal_code:string;
    name:string;
    price:number
    unit_type:string;
    image:string;
    model_title:string;
    qtd:number;

    total():number {
        return this.qtd * this.price;
    }
}

export class IBCombinationOrder extends IBObject {
    name:string;
    price:number
    image:string;
    comment:string;
    quantity:number; //unitary price

    bundles : Array<IBCombinationBundle>;

    constructor (data:object) {
        super();
        this.setData(data);
    }

    setData(data:object):void {
        super.setData(data);
    }

    totalPrice():number {
        return this.quantity * this.price;
    }

    getIngredientsText() : string {
        let finalString = "";

        this.bundles.forEach(bundle => {

            let mString = '';
            bundle.ingredients.forEach(ingredient => {
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
    }
}

export class IBProductsKitOrder extends IBObject {
    name:string;
    price:number
    image:string;
    comment:string;
    qtd:number; //unitary price

    bundles : Array<IBProductsKitBundleOrder>;

    constructor (data:object) {
        super();
        this.setData(data);
    }

    setData(data:object):void {
        super.setData(data);
    }

    totalPrice():number {
        return this.qtd * this.price;
    }

    getIngredientsText() : string {
        let finalString = "";

        this.bundles.forEach(bundle => {

            let mString = '';
            bundle.products.forEach(ingredient => {
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
    }
}

export class IBProductsKitBundleOrder extends IBObject {
    id:string;
    products : Array<IBProductsKitBundleProductsOrder>;

    constructor (data:object) {
        super();
        this.setData(data);
    }

    setData(data:object):void {
        super.setData(data);

        this.products = [];
        for (let i = 0; i < data['products'].length; i++) {
            this.products.push(new IBProductsKitBundleProductsOrder(data['products'][i]));
        }
    }    
}

export class IBProductsKitBundleProductsOrder extends IBObject {
    id:string;
    name:string;
    qtd:number;

    constructor (data:object) {
        super();
        this.setData(data);
    }

    setData(data:object):void {
        super.setData(data);
    }    
}

export class IBOrder extends IBObject {
    _id:string;
    comment:string;
    status:IBStatus;
    code:string;
    store_id:string;
    schedule:boolean;
    coupon?: {value?:number, coupon_type:string; code:string};
    created_at:Date;
    delivery_tax:number;
    delivery_info: {city:string, neighborhood:string, street_number:string, country:string, complement:string, zipcode:string, label:string, state:string, street:string, shippingTax:number};
    seen:boolean; // se a compra foi visualizada no sistema
    buy_type:string;
    delivery_hour: IBScheduleBand;
    products: Array<IBProductOrder>;
    combinations: Array<IBCombinationOrder>;
    kits: Array<IBProductsKitOrder>;
    payment_info: {method:string, value:any};
    accountInformation: {phone:string, gender:string, email:string, cpf:string, name:string};
    online_payment_credit_card: {card_flag: string, last_numbers:string};
    billet_url:string;
    billet_bar_code:string;
    installment: {interest: number, qtd:5}

    constructor(data?:object) {
        super();
        this.setData(data);
    }

    setData(data:object):void {
        super.setData(data);
        
        this.products = [];
        if (data['products']) {
            for (let i = 0; i < data['products'].length; i++) {
                this.products.push(new IBProductOrder(data['products'][i]));
            }
        }

        this.kits = [];
        if (data['kits']) {
            for (let i = 0; i < data['kits'].length; i++) {
                this.kits.push(new IBProductsKitOrder(data['kits'][i]));
            }
        }

        this.combinations = [];
        if (data['combinations']) {
            for (let i = 0; i < data['combinations'].length; i++) {
                this.combinations.push(new IBCombinationOrder(data['combinations'][i]));
            }
        }

        this.status = undefined;
        if (data['status']) {
            this.status = new IBStatus(data['status']);
        }

        if (this.created_at) {
            this.created_at = IBDateUtil.getDate(data['created_at']);
        }
    }

    subtotal():number {
        let sum:number = 0;

        let length = this.products.length;
        for (let i = 0; i < this.products.length; i++) {
            sum += Number(this.products[i].qtd) * Number(this.products[i].price);
        }
        for (let i =0; i < this.combinations.length; i++) {
            sum += Number(this.combinations[i].quantity * Number(this.combinations[i].price));
        }
        for (let i =0; i < this.kits.length; i++) {
            sum += Number(this.kits[i].qtd * Number(this.kits[i].price));
        }
        return sum;
    }

    installmentTax():number {
        if (this.installment && this.installment.interest > 0) {
            let total = this.subtotal() + this.deliveryTax() - this.discount();
            let totalWithInterest = total * Math.pow(1+this.installment.interest/100.0, this.installment.qtd);
            return totalWithInterest - total;
        }
        else return 0;
    }

    deliveryTax():number {
        if (this.delivery_info && this.delivery_tax) 
            return this.delivery_tax;
        else
            return 0;
    }

    discount():number {
        if (!this.coupon) 
            return 0;
        else {
            if (this.coupon.coupon_type == 'deli_free') 
                return this.deliveryTax();
            else if (this.coupon.coupon_type == 'buy_fixe') 
                return this.coupon.value;
            else 
                return ( this.coupon.value / 100.0) * this.subtotal();
        }
    }

    total():number {
        return this.subtotal() + this.deliveryTax() - this.discount() + this.installmentTax();
    }
    
    labelBuyType():string {
        if (this.buy_type == 'deli') return 'Delivery';
        if (this.buy_type == 'coll') return 'Coletar na loja';
        return '';
    }

    labelPayment():string {
        if (this.payment_info.method == 'credit')
            return "Crédito"
        if (this.payment_info.method == 'debit')
            return "Débito"
        if (this.payment_info.method == 'cash')
            return "Dinheiro"
        if (this.payment_info.method == 'check')
            return "Cheque"
        if (this.payment_info.method == 'billet')
            return "Boleto bancário"
        if (this.payment_info.method == 'pm_online')
            return "Pagamento Online"
        if (this.payment_info.method == 'deposit')
            return "Depósito Bancário";
        return ''
    }
}