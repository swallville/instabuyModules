import { IBItem } from "./item.model";
export declare class IBNotifyItemIdentifier {
    id: string;
    model_id?: string;
    kit_cart_id?: string;
    qtd: number;
}
export declare class IBItemsObservable {
    observers: Array<IBItem>;
    constructor();
    subscribe(observer: IBItem): void;
    unsubscribe(observer: IBItem): void;
    notifyObservers(notify: IBNotifyItemIdentifier): void;
}
