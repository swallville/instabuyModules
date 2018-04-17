import { IBUtil } from "./util.model";
import { IBItem } from "./item.model";
import { IBProductsKit } from "./productskit.model";
import { IBProduct } from "./product.model";

export class IBNotifyItemIdentifier {
    id:string;
    model_id?:string;
    kit_cart_id?:string;
    qtd:number
}

// export interface IBItemsObserver {
//     productUpdated(product: IBNotifyProductIdentifier): void;
// }

export class IBItemsObservable {
    observers: Array<IBItem>;

    constructor() {
        this.observers = [];
    }

    subscribe(observer:IBItem):void{
        if (this.observers.indexOf(observer) == -1)
            this.observers.push(observer);
    }

    unsubscribe(observer:IBItem):void {
        IBUtil.removeObjectFromArray(this.observers, observer);
    }

    notifyObservers(notify: IBNotifyItemIdentifier):void {
        for (let observer of this.observers) {
            if (observer.id == notify.id) {
                if (observer.item_type == 'product') {
                    let product = <IBProduct> observer;
                    for (let price of product.prices) {
                        if (notify.model_id && notify.model_id == price.id) {
                            price.qtdOnCart = notify.qtd;
                            break;
                        }
                    }
                }
                // else if (observer.item_type == 'products_kit') {
                //     let kit = <IBProductsKit> observer;
                //     if (notify.kit_cart_id && kit.cart_id == notify.kit_cart_id) {
                //         kit.qtdOnCart = notify.qtd;
                //     }
                // }
            }
        }
    }
}