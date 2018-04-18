import { IBObject } from "./object.model";
export declare class IBCategory extends IBObject {
    id: string;
    title: string;
    image: string;
    constructor(data?: object);
}
export declare class IBSubCategory extends IBObject {
    id: string;
    title: string;
    constructor(data?: object);
}
