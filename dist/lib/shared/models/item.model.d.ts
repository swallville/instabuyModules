import { IBObject } from './object.model';
export declare class IBItem extends IBObject {
    id: string;
    item_type: string;
    subcategory_id: string;
    subcategory_name: string;
    category_id: string;
    category_name: string;
    store_id: string;
    visible: boolean;
    description: string;
    images: Array<string>;
    name: string;
    created_at: Date;
    last_modified: Date;
    cart_attachment: string;
    constructor(data: object);
    setData(data: object): void;
    qtdBadge(): number;
}
