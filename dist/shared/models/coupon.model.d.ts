import { IBObject } from './object.model';
export declare class IBCoupon extends IBObject {
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
