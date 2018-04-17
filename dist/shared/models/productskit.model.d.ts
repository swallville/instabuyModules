import { IBObject } from './object.model';
import { IBProduct } from './product.model';
import { IBItem } from './item.model';
export declare class IBProductsKit extends IBItem {
    internal_code: string;
    price: number;
    promo_price: number;
    promo_end_at: Date;
    bundles: Array<IBProductsKitBundle>;
    cart_id: string;
    qtdOnCart: number;
    auxQtdCart: number;
    constructor(data: object);
    setData(data: object): void;
    getValidPrice(): number;
    inPromotion(): boolean;
    qtdBadge(): number;
    enoughStockForNKits(qtd: number): boolean;
    getPrice(): number;
    getTotalPrice(): number;
    getItemsText(): string;
    getCartDocument(attachment?: string): object;
}
export declare class IBProductsKitBundle extends IBObject {
    id: string;
    name: string;
    min_choice: number;
    max_choice: number;
    products: Array<IBProductsKitBundleItem>;
    constructor(data: object);
    setData(data: object): void;
    numberOfItensSelected(): number;
    hasProductSelected(): boolean;
    textForItems(): string;
}
export declare class IBProductsKitBundleItem extends IBObject {
    data: IBProduct;
    additional_price: number;
    qtdOnCart: number;
    auxQtdCart: number;
    constructor(data: object);
    setData(data: object): void;
    textForProduct(): string;
}
