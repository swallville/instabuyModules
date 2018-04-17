import { IBObject } from './object.model';

export interface IBAddressDeliveryInterface {
    id: string;
    
    state: string;
    city: string;
    neighborhood: string;
    
    delivery_type: string; // tracks, neighborhood
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
    delivery: boolean|IBAddressDeliveryInterface;

    constructor(data: object = {}) {
        super();
        super.setData(data);
    }

    registerDocument(): object {
        let addressDocument:object = {};

        addressDocument['label'] = this.label;
        addressDocument['zipcode'] = this.zipcode;
        addressDocument['country'] = this.country;
        addressDocument['state'] = this.state;
        addressDocument['city'] = this.city;
        addressDocument['neighborhood'] = this.neighborhood;
        addressDocument['street'] = this.street;
        addressDocument['street_number'] = this.street_number;
        addressDocument['complement'] = this.complement;

        return addressDocument;
    }
}