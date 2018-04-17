import { IBObject } from './object.model';
import { fixFloatPoint } from '../modules/general.module';
import { IBQuantity } from "./quantity.model";
import { IBItem } from './item.model';
import { IBDateUtil } from './dateutil.model';
import { IBUtil } from './util.model';

export class IBProductModel extends IBObject {

    id: string;
    title: string;
    internal_code: string;
    qtd_stock: number;
    price: number;
    promo_price: number;
    promo_end_at: Date;
    bar_codes: Array<string>;

    qtdOnCart:number = 0;

    auxQtdCart:number = 1;

    quantityModel: IBQuantity;

    constructor (data:object, increment_value:number) {
        super();
        this.setData(data);

        this.auxQtdCart = Math.max(this.qtdOnCart, increment_value);
    }

    setData(data:object) {
        super.setData(data);
        this.quantityModel = new IBQuantity(this.qtdOnCart);

        if (this.promo_end_at)
            this.promo_end_at = IBDateUtil.getDate(data['promo_end_at']);
    }

    qtd (value?:number) {
        return this.quantityModel.qtd(value);
    }

    inPromotion():boolean {
        return this.price != this.getValidPrice();
    }

    getValidPrice():number {
        if (this.promo_end_at && this.promo_end_at.getTime() > Date.now() && this.promo_price)
            return this.promo_price;
        else
            return this.price;
    }
}

export class IBProductLabelModel extends IBObject {
    field:string;
    value:string;
}

export class IBProduct extends IBItem {

    brand: string;
    unit_type: string;
    increment_value: number;
    is_service: boolean;

    prices: Array<IBProductModel>;

    attachment : string;
    labels: Array<IBProductLabelModel>;
    variation_products: Array<IBProduct>;
    related_products: Array<IBProduct>;

    constructor (data:object) {
        super(data);

        if (Object.keys(data).length > 0)
            this.setData(data);
    }

    setData(data:object):void {
        super.setData(data);

        if (this.unit_type == 'UNI')
            this.unit_type = 'unidade';
        else
            this.unit_type = this.unit_type.toLowerCase();
        
        this.prices = [];
        if (data && data['prices'] && data['prices'].length > 0) {
            for (let i = 0; i < data['prices'].length; i++) {
                this.prices.push(new IBProductModel(data['prices'][i], this.increment_value));
            }
        }
        this.related_products = [];
        if (data['related_products'] && data['related_products'].length > 0 && data['related_products'][0]['name']) {
            for (let i = 0; i < data['related_products'].length; i++) {
                if (data['related_products'][i]['visible']) 
                    this.related_products.push(new IBProduct(data['related_products'][i]));
            }
        }
        this.variation_products = [];
        if (data['variation_products'] && data['variation_products'].length > 0 && data['variation_products'][0]['name']) {
            for (let i = 0; i < data['variation_products'].length; i++) {
                if (data['variation_products'][i]['visible']) 
                    this.variation_products.push(new IBProduct(data['variation_products'][i]));
            }
        }
        this.labels = [];
        if (data['labels'] && data['labels'].length > 0) {
            for (let i = 0; i < data['labels'].length; i++) {
                this.labels.push(new IBProductLabelModel(data['labels'][i]));
            }
        }
    }

    qtdBadge():number {
        let badge = 0;
        for (let price of this.prices) {
            badge += price.qtdOnCart;
        }
        return badge;
    }

    returnModel(modelId?:string):IBProductModel {
        let model:IBProductModel;
        if (!modelId) {
            model = this.prices[0];
            if (this.prices.length > 1) {
                for (let i = 0; i < this.prices.length; i++) {
                    if ( this.prices[i].title == 'default' ) {
                        model = this.prices[i];
                        break;
                    }
                }
            }
        } else {
            for (let i = 0; i < this.prices.length; i++) {
                if ( this.prices[i].id == modelId ) {
                    model = this.prices[i];
                    break;
                }
            }
        }
        return model;
    }


    removeOtherModelsThan(model_id) {
        let models_to_remove = [];
        for (let model of this.prices) {
            if (model.id != model_id)
                models_to_remove.push(model);
        }

        for (let model of models_to_remove) 
            IBUtil.removeObjectFromArray(this.prices, model);
    }

    clearItem():void {
        for (let i = 0; i < this.prices.length; i ++) {
            this.prices[i].quantityModel.qtd(0);
        }
    }

    discountPercent():number {
        let maxDiscount = 0;
        for (let i = 0; i < this.prices.length; i++) {
            let pc = this.prices[i];
            // todo validate promo price
            if (pc.promo_price) {
                let discount = (1 - (pc.promo_price/pc.price)) * 100;
                if (discount > maxDiscount)
                    maxDiscount = discount;
            }
        }
        return maxDiscount;
    }

    minPrice():number {
        let minPrice = 999999;
        //todo implement right
        for (let i = 0; i < this.prices.length; i++) {
            let modelPrice = this.prices[i].getValidPrice();
            if (modelPrice < minPrice)
                minPrice = modelPrice;
        }
        return minPrice;
    }

    inPromotion():boolean {
        for (let i = 0; i < this.prices.length; i++) {
            if (this.prices[i].inPromotion())
                return true;
        }
        return false;
    }

    cartSubtotal():number {
        return this.prices[0].getValidPrice() * this.prices[0].qtdOnCart;
    }
    

    /* ###################################
    ############ CART METHODS ############
    ################################### */
    getCartDocument(model: IBProductModel, attachment?: string) : object {
        return {product_id:this.id, model_id:model.id, qtd:model.qtdOnCart, attachment:attachment};        
    }
}