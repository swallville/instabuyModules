import { IBObject } from './object.model';
export interface IBAddressDeliveryInterface {
    id: string;
    state: string;
    city: string;
    neighborhood: string;
    delivery_type: string;
    tax: number;
    minPrice: number;
}
export declare class IBAddress extends IBObject {
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
