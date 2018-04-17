import { IBObject } from './object.model';
import { IBProduct } from './product.model';
import { IBCoupon } from "./coupon.model";
import { IBAddressDeliveryInterface } from "./address.model";
import { IBProductsKit } from './productskit.model';
export declare class IBCart extends IBObject {
    products: Array<IBProduct>;
    kits: Array<IBProductsKit>;
    deliveryRule: boolean | IBAddressDeliveryInterface;
    coupon: boolean | IBCoupon;
    cartOfService: boolean;
    constructor();
    setData(data: any): void;
    subtotal(): number;
    deliveryTax(): number;
    discount(): number;
    total(): number;
    hasItemOnCart(): boolean;
    buyHasOnlyServiceProducts(): void;
}
