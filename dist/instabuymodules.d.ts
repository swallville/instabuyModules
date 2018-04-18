// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../@angular/core
//   ../@angular/forms
//   ../@angular/platform-browser
//   ../@angular/http
//   ../rxjs/Observable
//   ../@angular/router

declare module 'instabuymodules' {
    export * from 'instabuymodules/shared/models/address.model';
    export * from 'instabuymodules/shared/models/cart.model';
    export * from 'instabuymodules/shared/models/category.model';
    export * from 'instabuymodules/shared/models/ccard.model';
    export * from 'instabuymodules/shared/models/combination.model';
    export * from 'instabuymodules/shared/models/coupon.model';
    export * from 'instabuymodules/shared/models/dateutil.model';
    export * from 'instabuymodules/shared/models/item.model';
    export * from 'instabuymodules/shared/models/items_observer.model';
    export * from 'instabuymodules/shared/models/layout.model';
    export * from 'instabuymodules/shared/models/list.model';
    export * from 'instabuymodules/shared/models/object.model';
    export * from 'instabuymodules/shared/modules/directives.module';
    export * from 'instabuymodules/shared/modules/field_validation.model';
    export * from 'instabuymodules/shared/modules/general.module';
    export * from 'instabuymodules/shared/modules/observable.module';
    export * from 'instabuymodules/shared/modules/self-safe.pipe';
    export * from 'instabuymodules/shared/services/analytics.service';
    export * from 'instabuymodules/shared/services/cart.service';
    export * from 'instabuymodules/shared/services/request.service';
    export * from 'instabuymodules/shared/services/store.service';
    export * from 'instabuymodules/shared/services/user.service';
}

declare module 'instabuymodules/shared/models/address.model' {
    import { IBObject } from 'instabuymodules/shared/models/object.model';
    export interface IBAddressDeliveryInterface {
        id: string;
        state: string;
        city: string;
        neighborhood: string;
        delivery_type: string;
        tax: number;
        minPrice: number;
    }
    export class IBAddress extends IBObject {
        id: string;
        label: string;
        zipcode: string;
        country: string;
        state: string;
        city: string;
        neighborhood: string;
        street: string;
        street_number: string;
        complement: string;
        delivery: boolean | IBAddressDeliveryInterface;
        constructor(data?: object);
        registerDocument(): object;
    }
}

declare module 'instabuymodules/shared/models/cart.model' {
    import { IBObject } from 'instabuymodules/shared/models/object.model';
    import { IBProduct } from 'instabuymodules/shared/models/product.model';
    import { IBCoupon } from "instabuymodules/shared/models/coupon.model";
    import { IBAddressDeliveryInterface } from "instabuymodules/shared/models/address.model";
    import { IBProductsKit } from 'instabuymodules/shared/models/productskit.model';
    export class IBCart extends IBObject {
        products: Array<IBProduct>;
        kits: Array<IBProductsKit>;
        deliveryRule: boolean | IBAddressDeliveryInterface;
        coupon: boolean | IBCoupon;
        cartOfService: boolean;
        constructor();
        setData(data: any): void;
        subtotal(): number;
        deliveryTax(): number;
        discount(): number;
        total(): number;
        hasItemOnCart(): boolean;
        buyHasOnlyServiceProducts(): void;
    }
}

declare module 'instabuymodules/shared/models/category.model' {
    import { IBObject } from "instabuymodules/shared/models/object.model";
    export class IBCategory extends IBObject {
        id: string;
        title: string;
        image: string;
        constructor(data?: object);
    }
    export class IBSubCategory extends IBObject {
        id: string;
        title: string;
        constructor(data?: object);
    }
}

declare module 'instabuymodules/shared/models/ccard.model' {
    import { IBObject } from 'instabuymodules/shared/models/object.model';
    export class IBCard extends IBObject {
        id: string;
        validate: string;
        lastNumbers: string;
        flag: string;
        document_number: string;
        address: {
            zipcode: string;
            country: string;
            state: string;
            city: string;
            neighborhood: string;
            street: string;
            street_number: string;
            complement: string;
        };
        address_id: string;
        card_hash: string;
        constructor(data?: object);
        registerDocument(): object;
    }
}

declare module 'instabuymodules/shared/models/combination.model' {
    import { IBObject } from 'instabuymodules/shared/models/object.model';
    export class IBCombination extends IBObject {
        _id: string;
        id: string;
        description: string;
        image: string;
        name: string;
        min_price: number;
        price: number;
        bundles: Array<IBCombinationBundle>;
        comment: string;
        quantity: number;
        temp: number;
        constructor(data: object);
        setData(data: object): void;
        getPrice(): number;
        getTotalPrice(): number;
        getBundlesForCartRequest(): Array<IBCombinationBundle>;
        getIngredientsText(): string;
        getFinishBuyJSON(): object;
        getVisiblePriceString(): string;
    }
    export class IBCombinationBundle extends IBObject {
        id: string;
        name: string;
        max: number;
        min: number;
        ingredients: Array<IBCombinationBundleIngredient>;
        constructor(data: object);
        hasIngredientSelected(): boolean;
        setData(data: object): void;
        numberOfIngredients(): number;
        numberOfItens(): number;
        textForIngredientAtPosition(index: number): string;
        textForIngredients(): string;
        setIngredientAtIndexSelected(index: number): void;
    }
    export class IBCombinationBundleIngredient extends IBObject {
        id: string;
        name: string;
        price: number;
        quantity: number;
        constructor(data: object);
        textForIngredient(): string;
    }
}

declare module 'instabuymodules/shared/models/coupon.model' {
    import { IBObject } from 'instabuymodules/shared/models/object.model';
    export class IBCoupon extends IBObject {
        store_id: string;
        code: string;
        couponType: string;
        value: number;
        store_name: string;
        valid: boolean;
        quantity: number;
        expiration: Date;
        email: string;
        constructor(data: object);
    }
}

declare module 'instabuymodules/shared/models/dateutil.model' {
    export class IBDateUtil {
        static getDate(server_utc_date: string): Date;
    }
}

declare module 'instabuymodules/shared/models/item.model' {
    import { IBObject } from 'instabuymodules/shared/models/object.model';
    export class IBItem extends IBObject {
        id: string;
        item_type: string;
        subcategory_id: string;
        subcategory_name: string;
        category_id: string;
        category_name: string;
        store_id: string;
        visible: boolean;
        description: string;
        images: Array<string>;
        name: string;
        created_at: Date;
        last_modified: Date;
        cart_attachment: string;
        constructor(data: object);
        setData(data: object): void;
        qtdBadge(): number;
    }
}

declare module 'instabuymodules/shared/models/items_observer.model' {
    import { IBItem } from "instabuymodules/shared/models/item.model";
    export class IBNotifyItemIdentifier {
        id: string;
        model_id?: string;
        kit_cart_id?: string;
        qtd: number;
    }
    export class IBItemsObservable {
        observers: Array<IBItem>;
        constructor();
        subscribe(observer: IBItem): void;
        unsubscribe(observer: IBItem): void;
        notifyObservers(notify: IBNotifyItemIdentifier): void;
    }
}

declare module 'instabuymodules/shared/models/layout.model' {
    import { IBObject } from "instabuymodules/shared/models/object.model";
    import { IBItem } from "instabuymodules/shared/models/item.model";
    export interface IBLayoutCategoryInterface {
        id: string;
        title: string;
        items: Array<IBItem>;
    }
    export interface IBLayoutBannerInterface {
        image: string;
        link: string;
        title: string;
    }
    export class IBLayout extends IBObject {
        collection: Array<IBLayoutCategoryInterface>;
        promotions: Array<IBItem>;
        banners: Array<IBLayoutBannerInterface>;
        constructor(data: Array<object>);
        setData(data: object): void;
        setCollection(collections: Array<object>): void;
        setPromotions(promotions: Array<object>): void;
        setBanners(banners: Array<object>): void;
    }
}

declare module 'instabuymodules/shared/models/list.model' {
    import { IBObject } from 'instabuymodules/shared/models/object.model';
    import { IBProduct } from 'instabuymodules/shared/models/product.model';
    export class IBProductsListItem extends IBObject {
        product: IBProduct;
        qtd: number;
        constructor(data: object);
        setData(data: object): void;
    }
    export class IBProductsList extends IBObject {
        id: string;
        user: string;
        admin_creator: string;
        name: string;
        description: string;
        products: Array<IBProductsListItem>;
        created_at: Date;
        constructor(data: object);
        setData(data: object): void;
        getRouterLinkUrl(): string;
    }
}

declare module 'instabuymodules/shared/models/object.model' {
    export class IBObject {
        protected data: any;
        constructor(data?: object);
        setData(data: any): void;
        get(field: string): any;
    }
}

declare module 'instabuymodules/shared/modules/directives.module' {
    import { ElementRef } from '@angular/core';
    export class IBInsertQuantity {
        constructor(el: ElementRef);
        onKeyDown(event: any): void;
    }
}

declare module 'instabuymodules/shared/modules/field_validation.model' {
    import { AbstractControl, FormControl } from '@angular/forms';
    export class FieldValidation {
        static MatchPassword(AC: AbstractControl): any;
        static ValidateCNPJ(control: FormControl): {
            ValidateCNPJ: boolean;
        };
        static isCNPJValid(cnpj: any): boolean;
        static ValidateCPF(control: FormControl): any;
        static ValidatePhone(control: FormControl): any;
    }
}

declare module 'instabuymodules/shared/modules/general.module' {
    export function removeSpecialCharacters(str: string): string;
    export function fixFloatPoint(value: number): number;
    export function isEmpty(value: string): boolean;
    export function priceToString(value: string | number): string;
    export function validateEmail(email: string): boolean;
    export function validateCep(cep: string): boolean;
    export function reverseBirthday(bday: string): string;
    export function isBirthdayReversed(bday: string): boolean;
    export function unreverseBirthday(bday: string): string;
    let imagePath: {
        AMAZON_URL1: string;
        AMAZON_URL2: string;
        imgS: (key: string) => string;
        imgM: (key: string) => string;
        imgB: (key: string) => string;
        imgL: (key: string) => string;
        banner: (key: string) => string;
        card: (key: string) => string;
        general: (key: string) => string;
    };
    export { imagePath };
    export function copyTextToClipboard(text: string): void;
    export function tokenGenerator(size?: number): string;
}

declare module 'instabuymodules/shared/modules/observable.module' {
    import { OnInit, OnDestroy } from '@angular/core';
    export enum NotifyUpdate {
        onUser = 0,
        onStore = 1,
    }
    export interface IBObserver extends OnInit, OnDestroy {
        notify(message: NotifyUpdate): void;
    }
    export interface IBSubject {
        observers: Array<IBObserver>;
        registerObserver(observer: IBObserver): void;
        unregisterObserver(observer: IBObserver): void;
        notifyObservers(message: NotifyUpdate): void;
    }
}

declare module 'instabuymodules/shared/modules/self-safe.pipe' {
    import { PipeTransform } from '@angular/core';
    import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
    export class EscapeHtmlPipe implements PipeTransform {
        constructor(sanitizer: DomSanitizer);
        transform(content: string): SafeHtml;
    }
    export class SafeUrlPipe implements PipeTransform {
        constructor(sanitizer: DomSanitizer);
        transform(url: string): SafeResourceUrl;
    }
}

declare module 'instabuymodules/shared/services/analytics.service' {
    import { IBStore } from "instabuymodules/shared/models/store.model";
    export class IBAnalytics {
        constructor();
        init(storeModel: IBStore): void;
        pageView(url: string): void;
        userRegistered(): void;
        userRegisterStarted(): void;
        startCheckout(): void;
        buyFinished(buyValue: number): void;
        addToCart(value: number, id: string, type: string): void;
        search(search: string, store_name: string): void;
    }
}

declare module 'instabuymodules/shared/services/cart.service' {
    import { Http } from "@angular/http";
    import { IBRequestService, IBCallBackRequestType } from 'instabuymodules/shared/services/request.service';
    import { IBResponse } from 'instabuymodules/shared/models/response.model';
    import { IBCart } from 'instabuymodules/shared/models/cart.model';
    import { IBProductModel } from 'instabuymodules/shared/models/product.model';
    import { Observable } from "rxjs/Observable";
    import { IBAnalytics } from 'instabuymodules/shared/services/analytics.service';
    import { IBItem } from 'instabuymodules/shared/models/item.model';
    import { IBItemsObservable } from 'instabuymodules/shared/models/items_observer.model';
    export class IBCartService extends IBRequestService {
        protected http: Http;
        itemsObservable: IBItemsObservable;
        cartModel: IBCart;
        lastOrder: {
            buyId: string;
            billet?: string;
        };
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
}

declare module 'instabuymodules/shared/services/request.service' {
    import { Http } from "@angular/http";
    import 'rxjs/add/operator/map';
    import { IBResponse } from "instabuymodules/shared/models/response.model";
    import { Observable } from "rxjs/Observable";
    import { IBProduct } from "instabuymodules/shared/models/product.model";
    import { IBProductsKit } from "instabuymodules/shared/models/productskit.model";
    import { IBItem } from "instabuymodules/shared/models/item.model";
    import { IBProductsList } from "instabuymodules/shared/models/list.model";
    export type IBCallBackRequestType = (responseModel: IBResponse) => void;
    export type IBCallBackItemsType = (products: Array<IBItem>, responseModel: IBResponse) => void;
    export type IBCallBackProductType = (productModel: IBProduct, responseModel: IBResponse) => void;
    export type IBCallBackKitType = (combination: IBProductsKit, responseModel: IBResponse) => void;
    export type IBCallBackListsType = (lists: Array<IBProductsList>, responseModel: IBResponse) => void;
    export class IBRequestService {
        protected http: Http;
        protected storeId: string;
        protected subdomain: string;
        protected custom_domain: string;
        constructor(http: Http);
        removeSpaces(value: string): string;
        createUrl(endpoint: string, args?: string, domain?: string, api?: string): string;
        getRequest(url: string): Observable<IBResponse>;
        postRequest(url: string, postDocument: object): Observable<IBResponse>;
        postXWWFormUrlEnconded(url: string, postDocument: object): Observable<IBResponse>;
        putRequest(url: string, postDocument: object): Observable<IBResponse>;
        deleteRequest(url: string): Observable<IBResponse>;
        uploadFile(file: File): Observable<IBResponse>;
    }
}

declare module 'instabuymodules/shared/services/store.service' {
    import { Http } from "@angular/http";
    import { Router } from "@angular/router";
    import { IBCartService } from "instabuymodules/shared/services/cart.service";
    import { IBStore } from "instabuymodules/shared/models/store.model";
    import { IBResponse } from "instabuymodules/shared/models/response.model";
    import { IBRequestService, IBCallBackRequestType, IBCallBackProductType, IBCallBackItemsType, IBCallBackKitType, IBCallBackListsType } from "instabuymodules/shared/services/request.service";
    import { IBObserver, IBSubject, NotifyUpdate } from "instabuymodules/shared/modules/observable.module";
    import { Observable } from "rxjs/Observable";
    import { IBCoupon } from "instabuymodules/shared/models/coupon.model";
    export enum IBItemsSortEnum {
        recents = 0,
        nameaz = 1,
        nameza = 2,
        pricemin = 3,
        pricemax = 4,
    }
    export class IBItemsCallOptionsModel {
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
    export class IBStoreService extends IBRequestService implements IBSubject {
        protected http: Http;
        protected cartService: IBCartService;
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
        fetchLayout(): Observable<IBResponse>;
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
}

declare module 'instabuymodules/shared/services/user.service' {
    import { Http } from "@angular/http";
    import { IBRequestService, IBCallBackRequestType } from 'instabuymodules/shared/services/request.service';
    import { IBUser } from 'instabuymodules/shared/models/user.model';
    import { IBResponse } from 'instabuymodules/shared/models/response.model';
    import { IBObserver, IBSubject, NotifyUpdate } from 'instabuymodules/shared/modules/observable.module';
    import { IBCartService } from 'instabuymodules/shared/services/cart.service';
    import { IBCard } from 'instabuymodules/shared/models/ccard.model';
    import { IBAddress } from 'instabuymodules/shared/models/address.model';
    import { Observable } from "rxjs/Observable";
    export class IBUserService extends IBRequestService implements IBSubject {
        protected http: Http;
        observers: Array<IBObserver>;
        userModel: IBUser;
        userLoggedIn: boolean;
        constructor(http: Http, cartService: IBCartService);
        registerObserver(observer: IBObserver): void;
        unregisterObserver(observer: IBObserver): void;
        notifyObservers(message: NotifyUpdate): void;
        fetchUser(): Observable<IBResponse>;
        fetchUserCards(): Observable<IBResponse>;
        fetchUserAddresses(): Observable<IBResponse>;
        fetchUserCoupons(): Observable<IBResponse>;
        pullUserCards(callBack?: IBCallBackRequestType): void;
        pullUserAdresses(callBack?: IBCallBackRequestType): void;
        pullUserCoupons(callBack?: IBCallBackRequestType): void;
        fetchUserOrders(): Observable<IBResponse>;
        pullOrders(callBack?: IBCallBackRequestType): void;
        pullUser(cardPull?: boolean, addressPull?: boolean, couponPull?: boolean, callBack?: IBCallBackRequestType): void;
        makeLogin(email: string, password: string, callBack?: IBCallBackRequestType): void;
        makeLogout(callBack?: IBCallBackRequestType): void;
        requestNewPassword(email: string, callBack?: IBCallBackRequestType): void;
        validateRecoveryPasswordToken(token: string, callBack?: IBCallBackRequestType): void;
        changePassword(password: string, token: string, callBack?: IBCallBackRequestType): void;
        updatePassword(oldPassword: string, newPassword: string, callBack?: IBCallBackRequestType): void;
        createUser(userModel: IBUser, password?: string, facebook_id?: string, callBack?: IBCallBackRequestType): void;
        saveUser(callBack?: IBCallBackRequestType): void;
        insertCCard(ccardModel: IBCard, callBack?: IBCallBackRequestType): void;
        deleteCCard(ccardModel: IBCard, callBack?: IBCallBackRequestType): void;
        insertAddress(addressModel: IBAddress, callBack?: IBCallBackRequestType): void;
        deleteAddress(addressModel: IBAddress, callBack?: IBCallBackRequestType): void;
        makeZipcodeRequest(zipcode: string, callBack?: IBCallBackRequestType): void;
    }
}

declare module 'instabuymodules/shared/models/product.model' {
    import { IBObject } from 'instabuymodules/shared/models/object.model';
    import { IBQuantity } from "instabuymodules/shared/models/quantity.model";
    import { IBItem } from 'instabuymodules/shared/models/item.model';
    export class IBProductModel extends IBObject {
        id: string;
        title: string;
        internal_code: string;
        qtd_stock: number;
        price: number;
        promo_price: number;
        promo_end_at: Date;
        bar_codes: Array<string>;
        qtdOnCart: number;
        auxQtdCart: number;
        quantityModel: IBQuantity;
        constructor(data: object, increment_value: number);
        setData(data: object): void;
        qtd(value?: number): number | void;
        inPromotion(): boolean;
        getValidPrice(): number;
    }
    export class IBProductLabelModel extends IBObject {
        field: string;
        value: string;
    }
    export class IBProduct extends IBItem {
        brand: string;
        unit_type: string;
        increment_value: number;
        is_service: boolean;
        prices: Array<IBProductModel>;
        attachment: string;
        labels: Array<IBProductLabelModel>;
        variation_products: Array<IBProduct>;
        related_products: Array<IBProduct>;
        constructor(data: object);
        setData(data: object): void;
        qtdBadge(): number;
        returnModel(modelId?: string): IBProductModel;
        removeOtherModelsThan(model_id: any): void;
        clearItem(): void;
        discountPercent(): number;
        minPrice(): number;
        inPromotion(): boolean;
        cartSubtotal(): number;
        getCartDocument(model: IBProductModel, attachment?: string): object;
    }
}

declare module 'instabuymodules/shared/models/productskit.model' {
    import { IBObject } from 'instabuymodules/shared/models/object.model';
    import { IBProduct } from 'instabuymodules/shared/models/product.model';
    import { IBItem } from 'instabuymodules/shared/models/item.model';
    export class IBProductsKit extends IBItem {
        internal_code: string;
        price: number;
        promo_price: number;
        promo_end_at: Date;
        bundles: Array<IBProductsKitBundle>;
        cart_id: string;
        qtdOnCart: number;
        auxQtdCart: number;
        constructor(data: object);
        setData(data: object): void;
        getValidPrice(): number;
        inPromotion(): boolean;
        qtdBadge(): number;
        enoughStockForNKits(qtd: number): boolean;
        getPrice(): number;
        getTotalPrice(): number;
        getItemsText(): string;
        getCartDocument(attachment?: string): object;
    }
    export class IBProductsKitBundle extends IBObject {
        id: string;
        name: string;
        min_choice: number;
        max_choice: number;
        products: Array<IBProductsKitBundleItem>;
        constructor(data: object);
        setData(data: object): void;
        numberOfItensSelected(): number;
        hasProductSelected(): boolean;
        textForItems(): string;
    }
    export class IBProductsKitBundleItem extends IBObject {
        data: IBProduct;
        additional_price: number;
        qtdOnCart: number;
        auxQtdCart: number;
        constructor(data: object);
        setData(data: object): void;
        textForProduct(): string;
    }
}

declare module 'instabuymodules/shared/models/store.model' {
    import { IBObject } from "instabuymodules/shared/models/object.model";
    import { IBLayout } from "instabuymodules/shared/models/layout.model";
    export interface IBMenuSubCategoryInterface {
        id: string;
        title: string;
    }
    export interface IBMenuCategoryInterface {
        id: string;
        title: string;
        subCategories: Array<IBMenuSubCategoryInterface>;
    }
    export interface IBWorkHourInterface {
        allDay?: boolean;
        close?: boolean;
        openHour?: string;
        closeHour?: string;
    }
    export class IBStoreHours extends IBObject {
        utc: string;
        sunday: IBWorkHourInterface;
        monday: IBWorkHourInterface;
        tuesday: IBWorkHourInterface;
        wednesday: IBWorkHourInterface;
        thursday: IBWorkHourInterface;
        friday: IBWorkHourInterface;
        saturday: IBWorkHourInterface;
        setData(data: object): void;
    }
    export enum IBDayEnum {
        sunday = 0,
        monday = 1,
        tuesday = 2,
        wednesday = 3,
        thursday = 4,
        friday = 5,
        saturday = 6,
    }
    export class IBScheduleBand extends IBObject {
        id: string;
        delay: number;
        quantity: number;
        start_time: string;
        end_time: string;
        delivery_date: Date;
        setData(data: object): void;
    }
    export class IBScheduleDay extends IBObject {
        date: string;
        complete_date: string;
        weekday: string;
        bands: Array<IBScheduleBand>;
        setData(data: object): void;
    }
    export class IBStoreLocality extends IBObject {
        id: string;
        state: string;
        neighborhood: string;
        city: string;
        tax: number;
        minPrice: number;
    }
    export class IBStoreCard extends IBObject {
        id: string;
        name: string;
        isDebit: boolean;
        isCredit: boolean;
        isVale: boolean;
        image: string;
    }
    export class IBInstallment extends IBObject {
        installments: string;
        min_price: number;
        interest: number;
        isValid(price: number): boolean;
        getFinalPriceWithInstallment(price: number): number;
        getFinalInstallment(price: number): number;
        getFinalInstallmentString(price: number): string;
    }
    export class IBPage extends IBObject {
        id: string;
        title: string;
        url_name: string;
        html_body: string;
        iframe_link: string;
        type: string;
    }
    export class IBStore extends IBObject {
        layout: IBLayout;
        menu: Array<IBMenuCategoryInterface>;
        id: string;
        name: string;
        subdomain: string;
        description: string;
        address: string;
        cep: string;
        tel: string;
        min_price_allowed: number;
        loc: Array<number>;
        hours: IBStoreHours;
        makeDelivery: boolean;
        makeCollect: boolean;
        makeShipping: boolean;
        moneyPayment: boolean;
        onlinePayment: boolean;
        checkPayment: boolean;
        offlinePayment: boolean;
        depositPayment: boolean;
        billetPayment: boolean;
        depositInfo: any;
        localities: Array<IBStoreLocality>;
        medias: Array<object>;
        available_deliveries: Array<IBScheduleDay>;
        background_color: string;
        background_image: string;
        mark: string;
        schedule: boolean;
        window_time: string;
        slogan: string;
        acceptedCards: Array<IBStoreCard>;
        creditList: Array<IBStoreCard>;
        debitList: Array<IBStoreCard>;
        valeList: Array<IBStoreCard>;
        installmentsrules: Array<IBInstallment>;
        is_market: boolean;
        whitelabel: boolean;
        google_analytics_key: string;
        fb_pixel_key: string;
        favicon: string;
        pages: Array<IBPage>;
        constructor(data?: object);
        setData(data: object): void;
        setMainMenu(menu: Array<object>): void;
        getCategory(categoryId: string): IBMenuCategoryInterface;
        getPage(pageUrl: string): IBPage;
        getMedia(media: string): string;
    }
}

declare module 'instabuymodules/shared/models/response.model' {
    export enum IBResponseStatus {
        error = 0,
        success = 1,
    }
    export class IBResponse {
        status: IBResponseStatus;
        type: string;
        data: any;
        constructor(response: object);
    }
}

declare module 'instabuymodules/shared/models/user.model' {
    import { IBObject } from 'instabuymodules/shared/models/object.model';
    import { IBCard } from 'instabuymodules/shared/models/ccard.model';
    import { IBAddress } from 'instabuymodules/shared/models/address.model';
    import { IBCoupon } from 'instabuymodules/shared/models/coupon.model';
    import { IBOrder } from 'instabuymodules/shared/models/order.model';
    export class IBUser extends IBObject {
        email: string;
        fName: string;
        lName: string;
        gender: string;
        birthday: string;
        cpf: string;
        phone: string;
        photo: string;
        cards: Array<IBCard>;
        addresses: Array<IBAddress>;
        coupons: Array<IBCoupon>;
        orders: Array<IBOrder>;
        recentOrders: number;
        validateEmail: Function;
        reverseBirthday: Function;
        constructor();
        setData(data: object): void;
        setOrders(orders: Array<object>): void;
        setCards(cards: Array<object>): void;
        setAddresses(addresses: Array<object>): void;
        setCoupons(coupons: Array<object>): void;
        getPhoto(): string;
        registerUserDocument(password?: string, facebookId?: string): object;
        saveUserDocument(): object;
        insertAddress(address: IBAddress): void;
        removeAddress(address: IBAddress): void;
        insertCCard(ccard: IBCard): void;
        removeCCard(ccard: IBCard): void;
        getAddress(addressId: string): IBAddress;
        getCard(cardId: string): IBCard;
        getCoupon(code: string): IBCoupon;
        getOrder(code: string): IBOrder;
    }
}

declare module 'instabuymodules/shared/models/quantity.model' {
    export class IBQuantity {
        value: number;
        updatedAt: Date;
        constructor(value?: number, updatedAt?: Date);
        qtd(value?: number): void | number;
    }
}

declare module 'instabuymodules/shared/models/order.model' {
    import { IBObject } from "instabuymodules/shared/models/object.model";
    import { IBScheduleBand } from "instabuymodules/shared/models/store.model";
    import { IBCombinationBundle } from "instabuymodules/shared/models/combination.model";
    export class IBStatus {
        id: string;
        title: string;
        color: string;
        constructor(id?: string);
        setData(id: string): void;
    }
    export class IBProductOrder extends IBObject {
        id: string;
        model_id: string;
        status: number;
        model_internal_code: string;
        name: string;
        price: number;
        unit_type: string;
        image: string;
        model_title: string;
        qtd: number;
        total(): number;
    }
    export class IBCombinationOrder extends IBObject {
        name: string;
        price: number;
        image: string;
        comment: string;
        quantity: number;
        bundles: Array<IBCombinationBundle>;
        constructor(data: object);
        setData(data: object): void;
        totalPrice(): number;
        getIngredientsText(): string;
    }
    export class IBProductsKitOrder extends IBObject {
        name: string;
        price: number;
        image: string;
        comment: string;
        qtd: number;
        bundles: Array<IBProductsKitBundleOrder>;
        constructor(data: object);
        setData(data: object): void;
        totalPrice(): number;
        getIngredientsText(): string;
    }
    export class IBProductsKitBundleOrder extends IBObject {
        id: string;
        products: Array<IBProductsKitBundleProductsOrder>;
        constructor(data: object);
        setData(data: object): void;
    }
    export class IBProductsKitBundleProductsOrder extends IBObject {
        id: string;
        name: string;
        qtd: number;
        constructor(data: object);
        setData(data: object): void;
    }
    export class IBOrder extends IBObject {
        _id: string;
        comment: string;
        status: IBStatus;
        code: string;
        store_id: string;
        schedule: boolean;
        coupon?: {
            value?: number;
            coupon_type: string;
            code: string;
        };
        created_at: Date;
        delivery_tax: number;
        delivery_info: {
            city: string;
            neighborhood: string;
            street_number: string;
            country: string;
            complement: string;
            zipcode: string;
            label: string;
            state: string;
            street: string;
            shippingTax: number;
        };
        seen: boolean;
        buy_type: string;
        delivery_hour: IBScheduleBand;
        products: Array<IBProductOrder>;
        combinations: Array<IBCombinationOrder>;
        kits: Array<IBProductsKitOrder>;
        payment_info: {
            method: string;
            value: any;
        };
        accountInformation: {
            phone: string;
            gender: string;
            email: string;
            cpf: string;
            name: string;
        };
        online_payment_credit_card: {
            card_flag: string;
            last_numbers: string;
        };
        billet_url: string;
        billet_bar_code: string;
        installment: {
            interest: number;
            qtd: 5;
        };
        constructor(data?: object);
        setData(data: object): void;
        subtotal(): number;
        installmentTax(): number;
        deliveryTax(): number;
        discount(): number;
        total(): number;
        labelBuyType(): string;
        labelPayment(): string;
    }
}

