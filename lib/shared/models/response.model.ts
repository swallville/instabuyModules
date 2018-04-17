export enum IBResponseStatus {
    error,
    success
}

export class IBResponse {
    status: IBResponseStatus;
    type: string;
    data: any;

    constructor(response:object) {
        if (response['status'] == 'success') this.status = IBResponseStatus.success;
        else this.status = IBResponseStatus.error
        this.type = response['type'];
        this.data = response['data'];
    }
}