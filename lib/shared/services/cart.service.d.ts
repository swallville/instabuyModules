import { Http } from "@angular/http";
import { IBRequestService, IBCallBackRequestType } from './request.service';
import { IBResponse } from '../models/response.model';
import { IBCart } from '../models/cart.model';
import { IBProductModel } from '../models/product.model';
import { Observable } from "rxjs/Observable";
import { IBAnalytics } from './analytics.service';
import { IBItem } from '../models/item.model';
import { IBItemsObservable } from '../models/items_observer.model';
export declare class IBCartService extends IBRequestService {
    protected http: Http;
    private analytics;
    itemsObservable: IBItemsObservable;
    cartModel: IBCart;
    lastOrder: {
        buyId: string;
        billet?: string;
    };
    private mergeCommandsObj;
    constructor(http: Http, analytics: IBAnalytics);
    clearCart(): void;
    fetchCart(): Observable<IBResponse>;
    pullCart(postBack?: (responseModel: IBResponse) => void): void;
    makeRequest(merge_request_id: string, postDocument: object, delay: number, callBack?: IBCallBackRequestType): void;
    mergeRequests(identity: string, command: () => void, time?: number): void;
    postListOnCart(list_id: string): Observable<IBResponse>;
    setQtdOnCartOnItemsAndSubscribe(items: Array<IBItem>): void;
    setItemOnCart(item: IBItem, product_model?: IBProductModel, attachment?: string, callBack?: IBCallBackRequestType): boolean;
    incrementItemOnCart(item: IBItem, callBack?: IBCallBackRequestType, delay?: number): boolean;
    decrementItemOnCart(item: IBItem, callBack?: IBCallBackRequestType, delay?: number): boolean;
    removeItemFromCart(item: IBItem, callBack?: IBCallBackRequestType): void;
    itemAlreadyInCart(id: string, product_model_id?: string, kit_cart_id?: string): boolean;
    setListOnCart(list_id: string, callBack?: IBCallBackRequestType): void;
}
