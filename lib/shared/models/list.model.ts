
import { IBResponse } from './response.model';
import { IBObject } from './object.model';
import { IBProduct } from './product.model';
import { IBDateUtil } from './dateutil.model';
import { removeSpecialCharacters } from '../modules/general.module';

export class IBProductsListItem extends IBObject {
    product : IBProduct;
    qtd : number;

    constructor (data:object) {
        super();

        if (Object.keys(data).length > 0)
            this.setData(data);
    }

    setData(data:object):void {
        super.setData(data);

        if (data['product']['name']) 
            this.product = new IBProduct(data['product']);
    }

}

export class IBProductsList extends IBObject {
    id:string;

    user : string;
    admin_creator : string;
    
    name : string;
    description : string;

    products: Array<IBProductsListItem>;

    created_at: Date;

    constructor (data:object) {
        super();

        if (Object.keys(data).length > 0)
            this.setData(data);
    }

    setData(data:object):void {
        super.setData(data);

        this.created_at = IBDateUtil.getDate(data['created_at']);

        this.products = [];
        if (data['products'] && data['products'].length > 0) {
            for (let i = 0; i < data['products'].length; i++) {
                if (data['products']) 
                    this.products.push(new IBProductsListItem(data['products'][i]));
            }
        }
    }

    getRouterLinkUrl():string {
        return '/perfil/lista/' + this.id + '/' + removeSpecialCharacters(this.name);
    }
}