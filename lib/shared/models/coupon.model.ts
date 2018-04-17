import { IBObject } from './object.model';

export class IBCoupon extends IBObject {
    
    store_id: string;
    code: string;
    couponType: string; // ('buy_porc','buy_fixe','deli_free')
    value: number;
    store_name:string;
    valid: boolean;
    quantity: number;
    expiration: Date;
    email: string;

    constructor(data: object) {
        super();
        this.setData(data);
    }

}