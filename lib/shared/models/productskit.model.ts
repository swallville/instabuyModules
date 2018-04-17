import { IBObject } from './object.model';
import { IBProduct } from './product.model';
import { IBItem } from './item.model';
import { IBDateUtil } from './dateutil.model';

export class IBProductsKit extends IBItem {

    internal_code : string;
    price : number;
    promo_price : number;
    promo_end_at : Date;

    bundles : Array<IBProductsKitBundle>;

    cart_id : string;

    qtdOnCart:number = 0;
    auxQtdCart:number = 1;

    constructor (data:object) {
        super(data);

        if (Object.keys(data).length > 0)
            this.setData(data);
    }

    setData(data:object):void {
        super.setData(data);

        if (this.promo_end_at)
            this.promo_end_at = IBDateUtil.getDate(data['promo_end_at']);

        this.bundles = [];
        if (data['bundles'] && data['bundles'].length > 0) {
            for (let i = 0; i < data['bundles'].length; i++) {
                this.bundles.push(new IBProductsKitBundle(data['bundles'][i]));
            }
        }
    }

    getValidPrice():number {
        if (this.promo_end_at && this.promo_end_at.getTime() > Date.now() && this.promo_price)
            return this.promo_price;
        else
            return this.price;
    }

    inPromotion():boolean {
        return this.price != this.getValidPrice();
    }

    qtdBadge():number {
        return 0;
    }

    enoughStockForNKits(qtd:number):boolean {
        //todo validates child product stock
        return true;
    }

    getPrice():number {
        let total = this.getValidPrice();
        for(let bundle of this.bundles){
            for(let product of bundle.products){
                total = total + (product.additional_price * Math.max(product.qtdOnCart, product.auxQtdCart));
            }
        }
        return total;
    }

    getTotalPrice(): number {
        return this.getPrice() * Math.max(this.qtdOnCart, this.auxQtdCart);
    }

    getItemsText() : string {
        let mString = "";

        this.bundles.forEach(bundle => {
            mString = mString + bundle.textForItems();
        });

        return mString;
    }

    /* ###################################
    ############ CART METHODS ############
    ################################### */
    getCartDocument(attachment?: string) : object {
        let cartDoc = {
            kit_id: this.id,
            qtd: this.auxQtdCart,
            attachment:attachment
        };

        let bundlesDoc = []
        for(let bundle of this.bundles) {
            let bundleDoc = {
                bundle_id: bundle.id
            }
            let products = [];
            for (let product of bundle.products) {
                if (product.auxQtdCart > 0)
                products.push({
                    product_id: product.data.id,
                    qtd: product.auxQtdCart
                })
            }
            bundleDoc['products'] = products;
            bundlesDoc.push(bundleDoc);
        }
        cartDoc['bundles'] = bundlesDoc;
        return cartDoc      
    }
}

export class IBProductsKitBundle extends IBObject {

    id : string;
    name : string;
    min_choice : number;
    max_choice : number;
    products : Array<IBProductsKitBundleItem>;

    constructor (data:object) {
        super(data);

        if (Object.keys(data).length > 0)
            this.setData(data);
    }

    setData(data:object):void {
        super.setData(data);

        this.products = [];
        if (data['products'] && data['products'].length > 0) {
            for (let i = 0; i < data['products'].length; i++) {
                this.products.push(new IBProductsKitBundleItem(data['products'][i]));
            }
        }
    }

    numberOfItensSelected():number {
        let qtd = 0;
        this.products.forEach(product => {
            qtd += product.auxQtdCart;
        });
        return qtd;
    }

    hasProductSelected():boolean{
        for(let prod of this.products){
            if(prod.auxQtdCart > 0)
                return true;
        }
        return false;
    }

    textForItems() : string {
        let mString = '';
        this.products.forEach(product => {
            if (product.qtdOnCart > 0) {
                if (mString != '')
                    mString = mString + ', ';
                
                if (product.qtdOnCart == 1)
                    mString = mString + product.data.name;
                else 
                    mString = mString + product.qtdOnCart + 'x ' + product.data.name;
            }
        });

        if (mString != '')
            mString = mString + '. ';

        return mString;
    }
}

export class IBProductsKitBundleItem extends IBObject {

    data: IBProduct;
    additional_price : number;

    qtdOnCart:number = 0;

    auxQtdCart:number = 0;

    constructor (data:object) {
        super(data);

        if (Object.keys(data).length > 0)
            this.setData(data);
    }

    setData(data:object):void {
        super.setData(data);

        if (data['data'] &&  data['data']['name']) {
                this.data = new IBProduct(data['data']);
        }
    }

    textForProduct() : string{
        if (this.auxQtdCart == 1)
            return this.data.name;
        else if (this.auxQtdCart > 1)
            return this.auxQtdCart + 'x ' + this.data.name;
        else
            return "";
    }
}