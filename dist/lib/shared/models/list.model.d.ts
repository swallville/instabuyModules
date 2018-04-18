import { IBObject } from './object.model';
import { IBProduct } from './product.model';
export declare class IBProductsListItem extends IBObject {
    product: IBProduct;
    qtd: number;
    constructor(data: object);
    setData(data: object): void;
}
export declare class IBProductsList extends IBObject {
    id: string;
    user: string;
    admin_creator: string;
    name: string;
    description: string;
    products: Array<IBProductsListItem>;
    created_at: Date;
    constructor(data: object);
    setData(data: object): void;
    getRouterLinkUrl(): string;
}
