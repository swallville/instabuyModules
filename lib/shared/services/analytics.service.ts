import { Injectable } from "@angular/core";
import { IBStore } from "../models/store.model";

declare var ga:Function;
declare var fbq:Function;

@Injectable()
export class IBAnalytics {
    constructor() {

    }

    init(storeModel: IBStore) {
        ga('create', 'UA-110676803-1', 'auto'); // ib GA Key
        if (storeModel.google_analytics_key)
            ga('create', storeModel.google_analytics_key, 'auto', 'clientTracker'); //client GA Key

        fbq('init', '598552787198962'); //ib Fb Pixel Key
        if (storeModel.fb_pixel_key)
            fbq('init', storeModel.fb_pixel_key); //client Fb Pixel Key
        fbq('track', 'PageView');
    }

    pageView(url:string) {
        ga('set', 'page', url);
        ga('clientTracker.set', 'page', url);
        ga('send', 'pageview');
        ga('clientTracker.send', 'pageview');

        fbq('track', 'PageView');
    }

    userRegistered() {
        fbq('track', 'CompleteRegistration');
    }

    userRegisterStarted() {
        fbq('track', 'Lead');
    }

    startCheckout() {
        fbq('track', 'InitiateCheckout');
    }

    buyFinished(buyValue:number) {
        fbq('track', 'Purchase', {
            value: buyValue,
            currency: 'BRL',
          });
    }

    addToCart(value:number, id:string, type:string) {
        fbq('track', 'AddToCart', {
          value: value,
          currency: 'BRL',
          content_ids: id,
          content_type: type,
        });      
    }

    search(search:string, store_name:string) {
        fbq('track', 'Search', {
          search_string: search,
          content_ids: store_name,
        });      
    }
}