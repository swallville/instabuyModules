import { IBObject } from './object.model';
export declare class IBCard extends IBObject {
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
