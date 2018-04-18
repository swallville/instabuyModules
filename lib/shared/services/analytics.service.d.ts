import { IBStore } from "../models/store.model";
export declare class IBAnalytics {
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
