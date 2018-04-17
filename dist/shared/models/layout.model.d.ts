import { IBObject } from "./object.model";
import { IBItem } from "./item.model";
export interface IBLayoutCategoryInterface {
    id: string;
    title: string;
    items: Array<IBItem>;
}
export interface IBLayoutBannerInterface {
    image: string;
    link: string;
    title: string;
}
export declare class IBLayout extends IBObject {
    collection: Array<IBLayoutCategoryInterface>;
    promotions: Array<IBItem>;
    banners: Array<IBLayoutBannerInterface>;
    constructor(data: Array<object>);
    setData(data: object): void;
    setCollection(collections: Array<object>): void;
    setPromotions(promotions: Array<object>): void;
    setBanners(banners: Array<object>): void;
}
