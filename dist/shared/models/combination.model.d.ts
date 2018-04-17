import { IBObject } from './object.model';
export declare class IBCombination extends IBObject {
    _id: string;
    id: string;
    description: string;
    image: string;
    name: string;
    min_price: number;
    price: number;
    bundles: Array<IBCombinationBundle>;
    comment: string;
    quantity: number;
    temp: number;
    constructor(data: object);
    setData(data: object): void;
    getPrice(): number;
    getTotalPrice(): number;
    getBundlesForCartRequest(): Array<IBCombinationBundle>;
    getIngredientsText(): string;
    getFinishBuyJSON(): object;
    getVisiblePriceString(): string;
}
export declare class IBCombinationBundle extends IBObject {
    id: string;
    name: string;
    max: number;
    min: number;
    ingredients: Array<IBCombinationBundleIngredient>;
    constructor(data: object);
    hasIngredientSelected(): boolean;
    setData(data: object): void;
    numberOfIngredients(): number;
    numberOfItens(): number;
    textForIngredientAtPosition(index: number): string;
    textForIngredients(): string;
    setIngredientAtIndexSelected(index: number): void;
}
export declare class IBCombinationBundleIngredient extends IBObject {
    id: string;
    name: string;
    price: number;
    quantity: number;
    constructor(data: object);
    textForIngredient(): string;
}
