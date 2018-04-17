import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { fixFloatPoint } from '../modules/general.module';
import { IBRequestService, IBCallBackRequestType } from './request.service';
import { IBResponse, IBResponseStatus } from '../models/response.model';
import { IBCart } from '../models/cart.model';
import { IBProduct, IBProductModel } from '../models/product.model';
import { IBObserver, IBSubject, NotifyUpdate } from '../modules/observable.module';
import { Observable } from "rxjs/Observable";
import { IBOrder } from "../models/order.model";
import { IBCombination, IBCombinationBundle } from "../models/combination.model";
import { IBAnalytics } from './analytics.service';
import { IBItem } from '../models/item.model';
import { IBProductsKit } from '../models/productskit.model';
import { IBItemsObservable } from '../models/items_observer.model';
import { IBUtil } from '../models/util.model';
import { IBProductsList } from '../models/list.model';

@Injectable()
export class IBCartService extends IBRequestService  {
    
    itemsObservable: IBItemsObservable;

    cartModel:IBCart;
    lastOrder:{buyId:string, billet?:string};

    private mergeCommandsObj:object = {};
    
    constructor(protected http:Http, private analytics: IBAnalytics) {
        super(http); // initiate requestService
        this.cartModel = new IBCart();
        this.itemsObservable = new IBItemsObservable();
        this.pullCart(); // pull cart for user
    }

    // esvazia carrinho
    clearCart():void {
        for (let prod of this.cartModel.products) {
            this.itemsObservable.observers.push(prod);
            this.itemsObservable.notifyObservers({id:prod.id, model_id:prod.prices[0].id, qtd:0})
        }
        for (let kit of this.cartModel.kits) {
            this.itemsObservable.observers.push(kit);
            this.itemsObservable.notifyObservers({id:kit.id, kit_cart_id:kit.cart_id, qtd:0})
        }
        
        this.cartModel.products = [];
        this.cartModel.kits = [];
    }

    // REALIZA A CHAMADA DO CARRINHO DO USUARIO
    fetchCart():Observable<IBResponse> {
        let endpoint:string = "/cart.json";
        return this.getRequest(this.createUrl(endpoint));
    }
    
    pullCart(postBack?:(responseModel:IBResponse)=>void):void {
        this.fetchCart().subscribe(responseModel => {
            if ( responseModel.status == IBResponseStatus.success ) {
                this.clearCart();
                this.cartModel.setData(responseModel.data);

                for (let prod of this.cartModel.products) {
                    this.itemsObservable.observers.push(prod);
                    this.itemsObservable.notifyObservers({id:prod.id, model_id:prod.prices[0].id, qtd:prod.prices[0].qtdOnCart})
                }
                for (let kit of this.cartModel.kits) {
                    this.itemsObservable.observers.push(kit);
                    this.itemsObservable.notifyObservers({id:kit.id, kit_cart_id:kit.cart_id, qtd:kit.qtdOnCart})
                }
            }
            if (postBack) postBack(responseModel);
        });
    }

    makeRequest(merge_request_id:string, postDocument:object, delay:number, callBack?:IBCallBackRequestType):void {        
        let endpoint:string = '/cart.json';
        this.mergeRequests(merge_request_id, ()=>{
            this.postRequest(this.createUrl(endpoint), postDocument).subscribe(responseModel => {
                if (responseModel.status == IBResponseStatus.success) {
                    // if (quantity == 0) {
                    //     this.cartModel.removeCartItem(cartItemModel);
                    // } else {
                    //     this.cartModel.addCartItem(cartItemModel);
                    // }
                }
                
                if (callBack) callBack(responseModel);
            });
        }, delay);
    }

    mergeRequests(identity:string, command:()=>void, time:number = 1400):void {
        if (!this.mergeCommandsObj[identity]) {
            this.mergeCommandsObj[identity] = [];
        }
        this.mergeCommandsObj[identity].push(command);
        let len = this.mergeCommandsObj[identity].length;
        setTimeout(() => {
            if (len == this.mergeCommandsObj[identity].length) {
                this.mergeCommandsObj[identity] = [];
                command();
            }
        }, time);
    }

    postListOnCart(list_id:string):Observable<IBResponse> {
        let endpoint:string = "/cart_list.json";

        let params = {
            list_id
        }

        return this.postRequest(this.createUrl(endpoint), params)
    }

    //----------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------CONTROLE DE QUANTIDADES DE PRODUTOS ---------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------
    setQtdOnCartOnItemsAndSubscribe(items:Array<IBItem>) {
        for (let item of items) {
            //subscribe to receive qtds changes
            this.itemsObservable.observers.push(item);

            //qtd validation
            if (item.item_type == 'product') {
                let product = <IBProduct> item;
                for (let cart_item of this.cartModel.products) {
                    if (cart_item.id == product.id) {
                        for (let price of product.prices) {
                            if (price.id == cart_item.prices[0].id) {
                                price.qtdOnCart = cart_item.prices[0].qtdOnCart;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }




    //----------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------
    setItemOnCart(item:IBItem, product_model?:IBProductModel, attachment?:string, callBack?:IBCallBackRequestType):boolean {
        let cartDoc : object;
        let request_id : string;

        if (item.item_type == 'product') {
            let product = <IBProduct> item;

            if (product_model.qtd_stock == -1 || product_model.auxQtdCart <= product_model.qtd_stock) {
                product_model.qtdOnCart = product_model.auxQtdCart;
                cartDoc = product.getCartDocument(product_model, attachment);
                request_id = product.id + product_model.id;

                if (!this.itemAlreadyInCart(item.id, product_model.id, undefined)) {
                    let clone = new IBProduct(JSON.parse(JSON.stringify(product)))
                    clone.removeOtherModelsThan(product_model.id);
                    this.cartModel.products.push(clone);
                    this.itemsObservable.observers.push(clone);
                }

                this.itemsObservable.notifyObservers({id:product.id, model_id:product_model.id, qtd:product_model.qtdOnCart});
            }
            else 
                return false;
        }
        else if (item.item_type == 'products_kit') {
            let kit = <IBProductsKit> item;

            if (kit.enoughStockForNKits(kit.auxQtdCart)) {
                cartDoc = kit.getCartDocument(attachment)
                request_id = kit.cart_id;

                this.cartModel.kits.push(kit);
            }
            else 
                return false;
        }

        this.makeRequest(request_id, cartDoc, 0, callBack);
        return true;
    }

    incrementItemOnCart(item:IBItem, callBack?:IBCallBackRequestType, delay:number = 1400):boolean {
        let cartDoc : object;
        let request_id : string;

        if (item.item_type == 'product') {
            let product = <IBProduct> item;

            let newQuantity = product.prices[0].qtdOnCart + product.increment_value;
            if (product.prices[0].qtd_stock == -1 || newQuantity <= product.prices[0].qtd_stock) {
                product.prices[0].qtdOnCart = newQuantity;
                cartDoc = product.getCartDocument(product.prices[0]);
                request_id = product.id + product.prices[0].id;

                if (!this.itemAlreadyInCart(item.id, product.prices[0].id, undefined)) {
                    let clone = new IBProduct(JSON.parse(JSON.stringify(product)))
                    clone.removeOtherModelsThan(product.prices[0].id);
                    this.cartModel.products.push(clone);
                    this.itemsObservable.observers.push(clone);
                }

                this.itemsObservable.notifyObservers({id:product.id, model_id:product.prices[0].id, qtd:product.prices[0].qtdOnCart});
            }
            else 
                return false;
        }
        else if (item.item_type == 'products_kit') {
            let kit = <IBProductsKit> item;

            let newQuantity = kit.qtdOnCart + 1;

            if (kit.enoughStockForNKits(newQuantity)) {
                kit.qtdOnCart = newQuantity;
                cartDoc = {kit_cart_id: kit.cart_id, qtd: newQuantity, kit_id: kit.id}
                request_id = kit.cart_id;
            }
            else 
                return false;
        }

        this.makeRequest(request_id, cartDoc, delay, callBack);
        return true;
    }

    decrementItemOnCart(item:IBItem, callBack?:IBCallBackRequestType, delay:number = 1400):boolean {
        let cartDoc : object;
        let request_id : string;

        if (item.item_type == 'product') {
            let product = <IBProduct> item;

            let newQuantity = product.prices[0].qtdOnCart - product.increment_value;
            if (newQuantity >= 0) {
                product.prices[0].qtdOnCart = newQuantity;
                cartDoc = product.getCartDocument(product.prices[0]);
                request_id = product.id + product.prices[0].id;

                if (newQuantity == 0) {
                    IBUtil.removeObjectFromArray(this.cartModel.products, item);
                }

                this.itemsObservable.notifyObservers({id:product.id, model_id:product.prices[0].id, qtd:product.prices[0].qtdOnCart});
            }
            else 
                return false;
        }
        else if (item.item_type == 'products_kit') {
            let kit = <IBProductsKit> item;

            let newQuantity = kit.qtdOnCart - 1;
            if (newQuantity >= 0) {
                kit.qtdOnCart = newQuantity;
                cartDoc = {kit_cart_id: kit.cart_id, qtd: newQuantity, kit_id: kit.id}
                request_id = kit.cart_id;

                if (newQuantity == 0) {
                    IBUtil.removeObjectFromArray(this.cartModel.kits, item);
                }
            }
            else 
                return false;
        }

        this.makeRequest(request_id, cartDoc, delay, callBack);
        return true;
    }

    removeItemFromCart(item:IBItem, callBack?:IBCallBackRequestType) {
        let cartDoc : object;
        let request_id : string;
        if (item.item_type == 'product') {
            let product = <IBProduct> item;
            product.prices[0].qtdOnCart = 0;
            cartDoc = product.getCartDocument(product.prices[0]);
            request_id = product.id + product.prices[0].id;

            IBUtil.removeObjectFromArray(this.cartModel.products, item);
            this.itemsObservable.notifyObservers({id:product.id, model_id:product.prices[0].id, qtd:product.prices[0].qtdOnCart});
        }
        else if (item.item_type == 'products_kit') {
            let kit = <IBProductsKit> item;
            cartDoc = {kit_cart_id: kit.cart_id, qtd: 0, kit_id: kit.id}
            request_id = kit.cart_id;

            IBUtil.removeObjectFromArray(this.cartModel.kits, item);
        }

        this.makeRequest(request_id, cartDoc, 0, callBack);
    }

    itemAlreadyInCart(id:string, product_model_id?:string, kit_cart_id?:string) {
        if (product_model_id) {
            for (let product of this.cartModel.products) {
                if (product.id == id && product.prices[0].id == product_model_id)
                    return true;
            }
        }
        else if (kit_cart_id) {
            for (let kit of this.cartModel.kits) {
                if (kit.cart_id == kit_cart_id) 
                    return true;
            }
        }
        return false;
    }

    setListOnCart(list_id:string, callBack?:IBCallBackRequestType) {
        this.postListOnCart(list_id).subscribe(responseModel => {
            let lists:Array<IBProductsList> = [];

            if (responseModel.status == IBResponseStatus.success) {
                this.pullCart();
            }

            if (callBack) callBack(responseModel);
        });
    }
}