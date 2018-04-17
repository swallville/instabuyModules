
import { IBResponse } from './response.model';
import { IBObject } from './object.model';
import { IBProduct } from './product.model';
import { IBDateUtil } from './dateutil.model';

export class IBItem extends IBObject {

    id: string;
    item_type : string;

    subcategory_id:string;  // id da subcategoria do produto
    subcategory_name:string;  // nome da subcategoria do produto
    category_id:string;  // id da categoria do produto
    category_name:string;  // nome da categoria do produto

    store_id: string;
    visible: boolean;

    description: string;
    images: Array<string>;

    name: string;
    created_at: Date;
    last_modified: Date;

    cart_attachment:string; // can be comment or file upload for example

    //todo implementar de volta
    // installment:number;     // numero maximo que esse produto pode ser parcelado sem juros

    constructor (data:object) {
        super();

        if (Object.keys(data).length > 0)
            this.setData(data);
    }

    setData(data:object):void {
        super.setData(data);

        this.created_at = IBDateUtil.getDate(data['created_at']);
        this.last_modified = IBDateUtil.getDate(data['last_modified']);

        if (data['subcategory_id'] && data['subcategory_id']['title']) {
            this.subcategory_id = data['subcategory_id']['id'];
            this.subcategory_name = data['subcategory_id']['title'];
            this.category_id = data['subcategory_id']['category_id']['id'];
            this.category_name = data['subcategory_id']['category_id']['title'];
        }
    }

    qtdBadge(){
        return 0;
    }
}