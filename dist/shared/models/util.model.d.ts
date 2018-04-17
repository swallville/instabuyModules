import { IBResponse } from "./response.model";
import { IBItem } from "./item.model";
export declare class IBUtil {
    static getItemsWithResponseDict(responseModel: IBResponse): Array<IBItem>;
    static removeObjectFromArray(array: any, object: any): void;
    static getDate(server_utc_date: string): Date;
}
