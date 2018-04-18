import { IBObject } from "./object.model";
import { IBScheduleBand } from "./store.model";
import { IBCombinationBundle } from "./combination.model";
export declare class IBStatus {
    private _STATUS;
    id: string;
    title: string;
    color: string;
    constructor(id?: string);
    setData(id: string): void;
}
export declare class IBProductOrder extends IBObject {
    id: string;
    model_id: string;
    status: number;
    model_internal_code: string;
    name: string;
    price: number;
    unit_type: string;
    image: string;
    model_title: string;
    qtd: number;
    total(): number;
}
export declare class IBCombinationOrder extends IBObject {
    name: string;
    price: number;
    image: string;
    comment: string;
    quantity: number;
    bundles: Array<IBCombinationBundle>;
    constructor(data: object);
    setData(data: object): void;
    totalPrice(): number;
    getIngredientsText(): string;
}
export declare class IBProductsKitOrder extends IBObject {
    name: string;
    price: number;
    image: string;
    comment: string;
    qtd: number;
    bundles: Array<IBProductsKitBundleOrder>;
    constructor(data: object);
    setData(data: object): void;
    totalPrice(): number;
    getIngredientsText(): string;
}
export declare class IBProductsKitBundleOrder extends IBObject {
    id: string;
    products: Array<IBProductsKitBundleProductsOrder>;
    constructor(data: object);
    setData(data: object): void;
}
export declare class IBProductsKitBundleProductsOrder extends IBObject {
    id: string;
    name: string;
    qtd: number;
    constructor(data: object);
    setData(data: object): void;
}
export declare class IBOrder extends IBObject {
    _id: string;
    comment: string;
    status: IBStatus;
    code: string;
    store_id: string;
    schedule: boolean;
    coupon?: {
        value?: number;
        coupon_type: string;
        code: string;
    };
    created_at: Date;
    delivery_tax: number;
    delivery_info: {
        city: string;
        neighborhood: string;
        street_number: string;
        country: string;
        complement: string;
        zipcode: string;
        label: string;
        state: string;
        street: string;
        shippingTax: number;
    };
    seen: boolean;
    buy_type: string;
    delivery_hour: IBScheduleBand;
    products: Array<IBProductOrder>;
    combinations: Array<IBCombinationOrder>;
    kits: Array<IBProductsKitOrder>;
    payment_info: {
        method: string;
        value: any;
    };
    accountInformation: {
        phone: string;
        gender: string;
        email: string;
        cpf: string;
        name: string;
    };
    online_payment_credit_card: {
        card_flag: string;
        last_numbers: string;
    };
    billet_url: string;
    billet_bar_code: string;
    installment: {
        interest: number;
        qtd: 5;
    };
    constructor(data?: object);
    setData(data: object): void;
    subtotal(): number;
    installmentTax(): number;
    deliveryTax(): number;
    discount(): number;
    total(): number;
    labelBuyType(): string;
    labelPayment(): string;
}
