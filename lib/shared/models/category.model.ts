import { IBObject } from "./object.model";

export class IBCategory extends IBObject {
    id:string;
    title:string;
    image:string;

    constructor(data?:object) {
        super();
        this.setData(data);
    }
}


export class IBSubCategory extends IBObject {
    id:string;
    title:string;

    constructor(data?:object) {
        super();
        this.setData(data);
    }
}