import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { IBCartService } from "./cart.service";
import { IBStore } from "../models/store.model";
import { IBResponse } from "../models/response.model";
import { IBRequestService, IBCallBackRequestType, IBCallBackProductType, IBCallBackItemsType, IBCallBackKitType, IBCallBackListsType } from "../services/request.service";
import { IBObserver, IBSubject, NotifyUpdate } from "../modules/observable.module";
import { Observable } from "rxjs/Observable";
import { IBCoupon } from "../models/coupon.model";
export declare enum IBItemsSortEnum {
    recents = 0,
    nameaz = 1,
    nameza = 2,
    pricemin = 3,
    pricemax = 4,
}
export declare class IBItemsCallOptionsModel {
    product_id?: string;
    kit_id?: string;
    subcategory_id?: string;
    category_id?: string;
    page?: number;
    N?: number;
    sort?: IBItemsSortEnum;
    getSort(): "" | "nameaz" | "nameza" | "pricemin" | "pricemax";
    args(): string;
}
export declare class IBStoreService extends IBRequestService implements IBSubject {
    protected http: Http;
    protected cartService: IBCartService;
    private router;
    observers: Array<IBObserver>;
    storeModel: IBStore;
    constructor(http: Http, cartService: IBCartService, router: Router);
    registerObserver(observer: IBObserver): void;
    unregisterObserver(observer: IBObserver): void;
    notifyObservers(message: NotifyUpdate): void;
    fetchSync(): boolean;
    initializeStore(): boolean;
    initializeSubdomainStore(subdomain: string): void;
    fetchItems(option?: IBItemsCallOptionsModel): Observable<IBResponse>;
    pullItems(option: IBItemsCallOptionsModel, callBack: IBCallBackItemsType): void;
    pullProduct(productId: string, callBack: IBCallBackProductType): void;
    pullKit(kitId: string, callBack: IBCallBackKitType): void;
    searchForProduct(search: string, callBack: IBCallBackItemsType, page?: number, N?: number): void;
    /** Retorna observable da requisicao de layout da pagina */
    fetchLayout(): Observable<IBResponse>;
    /** Faz requisicao de layout e insere o layout na loja */
    pullLayout(callBack?: IBCallBackRequestType): void;
    fetchMainMenu(): Observable<IBResponse>;
    pullMainMenu(callBack?: IBCallBackRequestType): void;
    fetchCategories(): Observable<IBResponse>;
    pullCategories(callBack?: IBCallBackRequestType): void;
    fetchDeliveryPrice(cep: string): Observable<IBResponse>;
    pullDeliveryPrice(cep: string, callBack: IBCallBackRequestType): void;
    fetchCoupon(couponCode: string): Observable<IBResponse>;
    validateCoupon(couponCode: string, callBack: (couponModel: IBCoupon, responseModel: IBResponse) => void): void;
    registerCardHash(number: string, name: string, expirationMonth: string, expirationYear: string, cvv: string, successCallBack: (cardHash: string) => void, errorCallBack: (errors: any) => void): void;
    placeOrder(orderObject: object, callBack?: (responseModel: IBResponse) => void): void;
    sendMessage(name: string, tel: string, email: string, message: string, callBack?: (responseModel: IBResponse) => void): void;
    subscribeNewsletter(email: string, callBack?: (responseModel: IBResponse) => void): void;
    getStoreId(): string;
    fetchLists(list_id?: string): Observable<IBResponse>;
    pullLists(list_id?: string, callBack?: IBCallBackListsType): void;
}
