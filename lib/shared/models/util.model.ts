import { IBResponse } from "./response.model";
import { IBItem } from "./item.model";
import { IBProduct } from "./product.model";
import { IBProductsKit } from "./productskit.model";

export class IBUtil {
    static getItemsWithResponseDict(responseModel: IBResponse): Array<IBItem> {
        let items:Array<IBItem> = [];

        for (let i = 0; i < responseModel.data.length; i++) {
            if (responseModel.data[i].item_type == 'product')
                items.push(new IBProduct(responseModel.data[i]));
            else if (responseModel.data[i].item_type == 'products_kit')
                items.push(new IBProductsKit(responseModel.data[i]));
        }

        return items;
    }

    static removeObjectFromArray(array, object) {
        let index = array.indexOf(object);
        if (index >= 0) array.splice(index, 1);
    }

    static getDate(server_utc_date:string): Date {
        let year = Number(server_utc_date.substring(0,4));
        let month = Number(server_utc_date.substring(5,7));
        let day = Number(server_utc_date.substring(8,10));
        let hour = Number(server_utc_date.substring(11,13));
        let minute = Number(server_utc_date.substring(14,16));

        let date = new Date(Date.UTC(year, month-1, day, hour, minute));
        return date;
    }
}