import { fixFloatPoint } from "../modules/general.module";

export class IBQuantity {

    value:number;
    updatedAt:Date;

    constructor (value?:number, updatedAt?:Date) {
        this.value = value;
        this.updatedAt = updatedAt;

        if (value == undefined) this.value = 0;
        if (updatedAt == undefined) this.updatedAt = new Date();
    }

    qtd (value?:number):void|number {
        if (value != undefined) {
            value = fixFloatPoint(value);
            this.value = value;
            this.updatedAt = new Date();
        } else {
            return this.value;
        }
    }
}