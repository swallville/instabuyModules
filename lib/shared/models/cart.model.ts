import { IBObject } from './object.model';
import { IBProduct } from './product.model';
import { IBCoupon } from "./coupon.model";
import { IBAddressDeliveryInterface } from "./address.model";
import { IBCombination } from "./combination.model";
import { IBProductsKit } from './productskit.model';

export class IBCart extends IBObject {
    
    public products: Array<IBProduct> = [];
    public kits: Array<IBProductsKit> = [];
    public deliveryRule:boolean|IBAddressDeliveryInterface;
    public coupon:boolean|IBCoupon;
    public cartOfService:boolean;

    constructor () {
        super();
    }

    setData(data:any):void {
        this.data = data;
        this.products = new Array();
        this.kits = new Array();
        if (!data || (!data.products && !data.kits)) return;
        for (let i = 0; i < data.products.length; i++) {
            this.products.push(new IBProduct(data.products[i]));
        }
        for(let i = 0; i < data.kits.length; i++){
            this.kits.push(new IBProductsKit(data.kits[i]));
        }

        this.buyHasOnlyServiceProducts();
    }

    subtotal():number {
        if (!this.hasItemOnCart()) return 0;
        let sum:number = 0;
        this.products.forEach(product => {
            sum += product.prices[0].getValidPrice() * product.prices[0].qtdOnCart;
        });
        
        this.kits.forEach(kit => {
            sum += kit.getTotalPrice();
        });
        return sum;
    }

    deliveryTax():number {
        if (this.cartOfService) return 0;
        if (!this.deliveryRule) return 0;
        if (this.coupon && (<IBCoupon>this.coupon).couponType == 'deli_free') return (<IBAddressDeliveryInterface>this.deliveryRule).tax;
        if ((<IBAddressDeliveryInterface>this.deliveryRule).minPrice < this.subtotal() - this.discount()) return 0;
        return (<IBAddressDeliveryInterface>this.deliveryRule).tax;
    }

    discount():number {
        if (!this.coupon) return 0;
        let couponModel:IBCoupon = (<IBCoupon>this.coupon);
        if (couponModel.couponType == 'deli_free') return this.deliveryTax();
        if (couponModel.couponType == 'buy_fixe') return couponModel['value'];
        return ( couponModel['value'] / 100.0) * this.subtotal();
    }

    total():number {
        if (!this.hasItemOnCart()) return 0;
        return this.subtotal() + this.deliveryTax() - this.discount();
    }

    hasItemOnCart():boolean {
        return this.products.length > 0 || this.kits.length > 0;
    }

    buyHasOnlyServiceProducts(): void {
        if (this.kits.length > 0) {
            this.cartOfService = false;
            return;
        }

        for (let i = 0; i < this.products.length; i++) {
            if (!this.products[i].is_service) {
                this.cartOfService = false;
                return;
            }
        }
       
        this.cartOfService = true;
    }
}