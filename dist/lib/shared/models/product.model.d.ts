import { IBObject } from './object.model';
import { IBQuantity } from "./quantity.model";
import { IBItem } from './item.model';
export declare class IBProductModel extends IBObject {
    id: string;
    title: string;
    internal_code: string;
    qtd_stock: number;
    price: number;
    promo_price: number;
    promo_end_at: Date;
    bar_codes: Array<string>;
    qtdOnCart: number;
    auxQtdCart: number;
    quantityModel: IBQuantity;
    constructor(data: object, increment_value: number);
    setData(data: object): void;
    qtd(value?: number): number | void;
    inPromotion(): boolean;
    getValidPrice(): number;
}
export declare class IBProductLabelModel extends IBObject {
    field: string;
    value: string;
}
export declare class IBProduct extends IBItem {
    brand: string;
    unit_type: string;
    increment_value: number;
    is_service: boolean;
    prices: Array<IBProductModel>;
    attachment: string;
    labels: Array<IBProductLabelModel>;
    variation_products: Array<IBProduct>;
    related_products: Array<IBProduct>;
    constructor(data: object);
    setData(data: object): void;
    qtdBadge(): number;
    returnModel(modelId?: string): IBProductModel;
    removeOtherModelsThan(model_id: any): void;
    clearItem(): void;
    discountPercent(): number;
    minPrice(): number;
    inPromotion(): boolean;
    cartSubtotal(): number;
    getCartDocument(model: IBProductModel, attachment?: string): object;
}
