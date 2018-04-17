export class IBObject {
    protected data:any;
    constructor (data?:object) {
        if (!data) data = {}

        if (Object.keys(data).length > 0)
            this.setData(data);
    }

    setData (data:any):void {
        for (let field in data) {
            this[field] = data[field];
        }
        this.data = data;
    }

    get(field:string):any {
        return this.data[field];
    }
}