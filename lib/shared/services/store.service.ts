import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import { Router } from "@angular/router";

import {IBCartService} from "./cart.service";
import {IBStore} from "../models/store.model";
import {IBLayout} from "../models/layout.model";
import {IBProduct} from "../models/product.model";
import {IBResponse, IBResponseStatus} from "../models/response.model";
import { IBRequestService, IBCallBackRequestType, IBCallBackProductType, IBCallBackItemsType, IBCallBackKitType, IBCallBackListsType } from "../services/request.service";

import {IBObserver, IBSubject, NotifyUpdate} from "../modules/observable.module";
import { Observable } from "rxjs/Observable";
import { IBCoupon } from "../models/coupon.model";
import { tokenGenerator } from "../modules/general.module";
import { IBCombination } from "../models/combination.model";
import { IBItem } from "../models/item.model";
import { IBProductsKit } from "../models/productskit.model";
import { IBUtil } from "../models/util.model";
import { IBProductsList } from "../models/list.model";

declare var PagarMe: any;

export enum IBItemsSortEnum {
    recents,
    nameaz,
    nameza,
    pricemin,
    pricemax
}

export class IBItemsCallOptionsModel {
    product_id?:string;
    kit_id?:string;
    subcategory_id?:string;
    category_id?:string;
    page?:number;
    N?:number;
    sort?:IBItemsSortEnum;

    getSort () {
        switch (this.sort) {
            case IBItemsSortEnum.nameaz: return "nameaz"
            case IBItemsSortEnum.nameza: return "nameza"
            case IBItemsSortEnum.pricemin: return "pricemin"
            case IBItemsSortEnum.pricemax: return "pricemax"
            default: return ""
        }
    }

    args():string {
        if (this.product_id) return "product_id="+this.product_id;
        if (this.kit_id) return "kit_id="+this.kit_id;

        let args:string = "";
        if (this.subcategory_id) args += "subcategory_id="+this.subcategory_id+"&";
        else if (this.category_id) args += "category_id="+this.category_id+"&";

        if (this.page) args += "page="+this.page+"&";
        if (this.N) args += "N="+this.N+"&";
        
        let sort:string = this.getSort();
        if (sort) args += "sort="+sort+"&";

        return args;
    }
}


@Injectable()
export class IBStoreService extends IBRequestService implements IBSubject {
    
    observers: Array<IBObserver>;
    
    public storeModel: IBStore;

    constructor(protected http: Http, protected cartService:IBCartService, private router:Router) {
        super(http);
        this.storeModel = new IBStore();
        this.observers = new Array();
    }

    // metodos para observer, NAO SOBREESCREVER
    registerObserver(observer: IBObserver): void {
        this.observers.push(observer);
    }

    unregisterObserver(observer: IBObserver): void {
        let index = this.observers.indexOf(observer);
        if (index >= 0) this.observers.splice(index,1);
    }

    notifyObservers(message: NotifyUpdate): void {
        for (let i = 0; i < this.observers.length; i++) {
            this.observers[i].notify(message);
        }
    }

    fetchSync ():boolean {
        let fields:string = 'name,subdomain,cover,mark,loc,address,cep,tel,hours,moneyPayment,checkPayment,onlinePayment,billetPayment,depositPayment,depositInfo,offlinePayment,makeShipping,visible,blocked,min_price_allowed,installmentsrules,description,schedule,window_time,background_color,slogan,background_image,acceptedCards,localities,medias,makeDelivery,makeCollect,is_market,available_deliveries,is_market,pages,google_analytics_key,favicon,fb_pixel_key,whitelabel';
        let args:string = '?fields='+fields;
        let xmlHttp = new XMLHttpRequest();
        let url:string = this.createUrl('/store.json', args);
        xmlHttp.open( "GET", url, false ); // false for synchronous request
        xmlHttp.withCredentials = true;
        xmlHttp.send( null );
        let response = new IBResponse( JSON.parse(xmlHttp.responseText) );
        if (response.status) {
            this.storeModel.setData(response.data);
            this.storeId = this.storeModel.id;
            return true;
        }
        else {
            return false;
        }
    }

    initializeStore ():boolean {
        this.pullMainMenu();
        return this.fetchSync();
    }
    
    initializeSubdomainStore(subdomain:string):void {
        let fields:string = 'name,subdomain,cover,mark,loc,address,cep,tel,hours,moneyPayment,checkPayment,onlinePayment,billetPayment,offlinePayment,makeShipping,visible,blocked,min_price_allowed,installmentsrules,description,schedule,window_time,background_color,slogan,background_image,acceptedCards,localities,medias,makeDelivery,makeCollect,is_market,available_deliveries,is_market,google_analytics_key,favicon,fb_pixel_key,whitelabel';
        let args:string = '?subdomain='+subdomain+'&fields='+fields;
        let xmlHttp = new XMLHttpRequest();
        let url:string = "https://instabuy.com.br/apiv3/store.json"+args;
        xmlHttp.open( "GET", url, false ); // false for synchronous request
        xmlHttp.withCredentials = true;
        xmlHttp.send( null );
        let response = new IBResponse( JSON.parse(xmlHttp.responseText) );
        this.storeModel.setData(response.data);
        this.storeId = this.storeModel.id;
    }

    // 
    // CHAMADAS AUTOMATICAS
    // 
    fetchItems(option?:IBItemsCallOptionsModel):Observable<IBResponse> {
        let endpoint:string = "/item.json";
        let args:string = option.args();
        return this.getRequest(this.createUrl(endpoint, args))
    }

    pullItems(option:IBItemsCallOptionsModel, callBack:IBCallBackItemsType):void {
        this.fetchItems(option).subscribe(responseModel => {
            let items:Array<IBItem> = [];
            let token:string = tokenGenerator();

            if (responseModel.status == IBResponseStatus.success) {
                items = IBUtil.getItemsWithResponseDict(responseModel);
                this.cartService.setQtdOnCartOnItemsAndSubscribe(items);
            }

            if (callBack) callBack(items, responseModel);
        });
    }

    pullProduct(productId:string, callBack:IBCallBackProductType):void {
        let option:IBItemsCallOptionsModel = new IBItemsCallOptionsModel()
        option.product_id = productId;
        this.pullItems(option, (items, responseModel) => {
            if (items.length == 0) items.push(undefined);
            if (callBack) callBack(<IBProduct>items[0], responseModel);
        });
    }

    pullKit(kitId:string, callBack:IBCallBackKitType):void {
        let option:IBItemsCallOptionsModel = new IBItemsCallOptionsModel()
        option.kit_id = kitId;
        this.pullItems(option, (items, responseModel) => {
            if (items.length == 0) items.push(undefined);
            if (callBack) callBack(<IBProductsKit>items[0], responseModel);
        });
    }

    searchForProduct(search:string, callBack:IBCallBackItemsType, page:number = 1, N:number = 25):void {
        let endpoint:string = '/search.json';
        let args:string = '?page='+page+'&N='+N+'&search='+search.split(' ').join('+');
        this.getRequest(this.createUrl(endpoint, args)).subscribe(responseModel => {
            let items:Array<IBItem> = [];
            items = IBUtil.getItemsWithResponseDict(responseModel);
            this.cartService.setQtdOnCartOnItemsAndSubscribe(items);
            callBack(items, responseModel);
        });
    }

    /** Retorna observable da requisicao de layout da pagina */
    fetchLayout ():Observable<IBResponse> {
        let endpoint:string = "/layout.json";
        return this.getRequest(this.createUrl(endpoint));
    }

    /** Faz requisicao de layout e insere o layout na loja */
    pullLayout (callBack?:IBCallBackRequestType):void {
        this.fetchLayout().subscribe(responseModel => {
            if (responseModel.status == IBResponseStatus.success) {
                let layoutModel = new IBLayout(responseModel.data);
                this.storeModel.layout = layoutModel;
                
                for (let category of layoutModel.collection) {
                    this.cartService.setQtdOnCartOnItemsAndSubscribe(category.items);
                }

                if (layoutModel.promotions)
                    this.cartService.setQtdOnCartOnItemsAndSubscribe(layoutModel.promotions);
            }
            if (callBack) callBack(responseModel);
        });
    }

    fetchMainMenu ():Observable<IBResponse> {
        let endpoint:string = "/menu.json";
        let args:string = "?filter=show_order";
        return this.getRequest(this.createUrl(endpoint, args));
    }

    pullMainMenu (callBack?:IBCallBackRequestType):void {
        this.fetchMainMenu().subscribe(responseModel => {
            if (responseModel.status == IBResponseStatus.success) {
                this.storeModel.setMainMenu(responseModel.data);
                this.notifyObservers(NotifyUpdate.onStore);
            }
            if (callBack) callBack(responseModel);
        });
    }

    fetchCategories ():Observable<IBResponse> {
        let endpoint:string = "/category.json";
        return this.getRequest(this.createUrl(endpoint, null));
    }

    pullCategories (callBack?:IBCallBackRequestType):void {
        this.fetchCategories().subscribe(responseModel => {
            if (callBack) callBack(responseModel);
        });
    }

    fetchDeliveryPrice(cep:string):Observable<IBResponse> {
        let endpoint:string = "/hasdelivery.json";
        let args:string = "?code="+cep;
        return this.getRequest(this.createUrl(endpoint, args));
    }

    pullDeliveryPrice(cep:string, callBack:IBCallBackRequestType):void {
        this.fetchDeliveryPrice(cep).subscribe(responseModel => {
            if (callBack) callBack(responseModel);
        });
    }

    fetchCoupon(couponCode:string):Observable<IBResponse> {
        let endpoint:string = "/coupon.json";
        let args:string = "?code="+couponCode;
        return this.getRequest(this.createUrl(endpoint, args));
    }
    
    validateCoupon(couponCode:string, callBack:(couponModel:IBCoupon, responseModel:IBResponse)=>void):void {
        this.fetchCoupon(couponCode).subscribe(responseModel => {
            let couponModel:IBCoupon;
            if (responseModel.status == IBResponseStatus.success) {
                let responseData:object|Array<object>;
                responseData = responseModel.data;
                if ((<Array<object>>responseData).length == undefined) {
                    couponModel = new IBCoupon(responseData);
                } else {
                    couponModel = undefined;
                }
            }
            if (callBack) callBack(couponModel, responseModel);
        })
    }

    registerCardHash (number:string, name:string, expirationMonth:string, expirationYear:string, cvv:string, successCallBack:(cardHash:string)=>void, errorCallBack:(errors:any)=>void):void {
        let hashKey:string = "ek_live_xXTPAO2M7kUdudRac5TVkULZlcmpmV";
        
        PagarMe.encryption_key = hashKey;
        let PMCard = new PagarMe.creditCard();
        PMCard.cardHolderName = name;
        PMCard.cardExpirationMonth = expirationMonth;
        PMCard.cardExpirationYear = expirationYear;
        PMCard.cardNumber = number;
        PMCard.cardCVV = cvv;

        var fieldErrors = PMCard.fieldErrors();
        var hasErrors = false;
        for(var field in fieldErrors) { hasErrors = true; break; }
        if(hasErrors) {
            // realiza o tratamento de erros
            errorCallBack(fieldErrors);
        } else {
            // se não há erros, gera o card_hash...
            PMCard.generateHash( (cardHash:string) => {
                successCallBack(cardHash);
            });
        }
    }

    placeOrder (orderObject:object, callBack?:(responseModel:IBResponse)=>void):void {
        let endpoint:string = '/buy.json';
        this.postXWWFormUrlEnconded(this.createUrl(endpoint), orderObject).subscribe(responseModel => {
            if (callBack) callBack(responseModel);
        });
    }

    sendMessage(name:string, tel:string, email:string, message:string, callBack?:(responseModel:IBResponse)=>void):void {
        let endpoint:string = '/message.json';
        if(tel && tel != ''){
            this.postRequest(this.createUrl(endpoint), {name:name, phone:tel, email:email, message:message, device:'web'}).subscribe(responseModel => {
                if (callBack) callBack(responseModel);
            });
        } else{
            this.postRequest(this.createUrl(endpoint), {name:name, email:email, message:message, device:'web'}).subscribe(responseModel => {
                if (callBack) callBack(responseModel);
            });
        }
    }

    subscribeNewsletter(email:string, callBack?:(responseModel:IBResponse)=>void):void {
        let endpoint:string = '/newsletter.json';
        this.postRequest(this.createUrl(endpoint), {email:email, device:'web'}).subscribe(responseModel => {
            if (callBack) callBack(responseModel);
        });
    }

    getStoreId(){
        return this.storeId;
    }

    fetchLists(list_id?:string):Observable<IBResponse> {
        let endpoint:string = "/list.json";
        let args:string;

        if (list_id) {
            args = '?list_id=' + list_id;
        }
        
        return this.getRequest(this.createUrl(endpoint, args))
    }

    pullLists(list_id?:string, callBack?:IBCallBackListsType):void {
        this.fetchLists(list_id).subscribe(responseModel => {
            let lists:Array<IBProductsList> = [];

            if (responseModel.status == IBResponseStatus.success) {
                for (let i = 0; i < responseModel.data.length; i++) {
                    lists.push(new IBProductsList(responseModel.data[i]));
                }
            }

            if (callBack) callBack(lists, responseModel);
        });
    }
}