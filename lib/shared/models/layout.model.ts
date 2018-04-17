import {IBObject} from "./object.model";
import {IBProduct} from "./product.model";
import {IBCombination} from "./combination.model";
import { IBItem } from "./item.model";
import { IBInsertQuantity } from "../modules/directives.module";
import { IBProductsKit } from "./productskit.model";

export interface IBLayoutCategoryInterface {
    id: string;
    title: string;
    items: Array<IBItem>;
}

export interface IBLayoutBannerInterface {
    image:string,
    link:string,
    title:string
}

export class IBLayout extends IBObject{

    collection: Array<IBLayoutCategoryInterface>;
    promotions: Array<IBItem>;
    banners: Array<IBLayoutBannerInterface>;

    constructor (data:Array<object>) {
        super();
        this.setData(data);
    }

    setData (data:object):void {
        this.data = data;
        if (data['collection_items']) {
            this.setCollection(data['collection_items']);
        }
        if (data['promo']) {
            this.setPromotions(data['promo']);
        }
        if (data['banners']) {
            this.setBanners(data['banners']);
        }
    }

    setCollection (collections:Array<object>):void {
        this.collection = new Array();
        let category: IBLayoutCategoryInterface;
        let aux_items: Array<object>;
        for (let i = 0; i < collections.length; i++) {
            category = {
                id: collections[i]['id'],
                title: collections[i]['title'],
                items: new Array()
            }
            
            aux_items = collections[i]['items'];
            for (let j = 0; j < aux_items.length; j++) {
                let obj = aux_items[j];
                if (obj['item_type'] == 'product')
                    category.items.push(new IBProduct(obj));
                else if (obj['item_type'] == 'products_kit')
                    category.items.push(new IBProductsKit(obj));
            }
            
            this.collection.push(category);
        }
    }

    setPromotions (promotions:Array<object>):void {
        this.promotions = new Array();
        let item: object;
        for (let i = 0; (i < promotions.length); i++) {
            item = promotions[i];
            if (item['item_type'] == 'product')
                this.promotions.push(new IBProduct(item));
            else if (item['item_type'] == 'products_kit')
                this.promotions.push(new IBProductsKit(item));
        }
    }

    setBanners (banners:Array<object>):void {
        this.banners = new Array();
        let item: IBLayoutBannerInterface;
        for (let i = 0; (i < banners.length) && (i<8); i++) {
            item = {
                image: banners[i]['image'],
                link: banners[i]['link'],
                title: banners[i]['title']
            }
            this.banners.push(item);
        }
    }
}