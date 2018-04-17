export declare class IBQuantity {
    value: number;
    updatedAt: Date;
    constructor(value?: number, updatedAt?: Date);
    qtd(value?: number): void | number;
}
