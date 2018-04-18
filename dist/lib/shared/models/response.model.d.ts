export declare enum IBResponseStatus {
    error = 0,
    success = 1,
}
export declare class IBResponse {
    status: IBResponseStatus;
    type: string;
    data: any;
    constructor(response: object);
}
