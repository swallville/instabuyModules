import { IBObject } from './object.model';

export class IBCard extends IBObject {

    id: string;
    validate: string;
    lastNumbers:string;
    flag:string;
    document_number:string;
    address: {
        zipcode: string;
        country: string;
        state: string;
        city: string;
        neighborhood: string;
        street: string;
        street_number: string;
        complement: string;
    }

    address_id: string;
    card_hash: string;

    constructor(data: object = {}) {
        super();
        super.setData(data);
    }
    
    registerDocument(): object {
        let ccardDocument:object = {};

        ccardDocument['card_hash'] = this.card_hash;
        ccardDocument['validate'] = this.validate;

        if (this.address_id) {
            ccardDocument['address_id'] = this.address_id;
        } else {
            ccardDocument['zipcode'] = this.address.zipcode;
            ccardDocument['country'] = this.address.country;
            ccardDocument['state'] = this.address.state;
            ccardDocument['city'] = this.address.city;
            ccardDocument['neighborhood'] = this.address.neighborhood;
            ccardDocument['street'] = this.address.street;
            ccardDocument['street_number'] = this.address.street_number;
            ccardDocument['complement'] = this.address.complement;
        }

        return ccardDocument;
    }

}