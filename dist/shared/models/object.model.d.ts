export declare class IBObject {
    protected data: any;
    constructor(data?: object);
    setData(data: any): void;
    get(field: string): any;
}
