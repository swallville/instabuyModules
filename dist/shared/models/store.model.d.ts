import { IBObject } from "./object.model";
import { IBLayout } from "./layout.model";
export interface IBMenuSubCategoryInterface {
    id: string;
    title: string;
}
export interface IBMenuCategoryInterface {
    id: string;
    title: string;
    subCategories: Array<IBMenuSubCategoryInterface>;
}
export interface IBWorkHourInterface {
    allDay?: boolean;
    close?: boolean;
    openHour?: string;
    closeHour?: string;
}
export declare class IBStoreHours extends IBObject {
    utc: string;
    sunday: IBWorkHourInterface;
    monday: IBWorkHourInterface;
    tuesday: IBWorkHourInterface;
    wednesday: IBWorkHourInterface;
    thursday: IBWorkHourInterface;
    friday: IBWorkHourInterface;
    saturday: IBWorkHourInterface;
    setData(data: object): void;
}
export declare enum IBDayEnum {
    sunday = 0,
    monday = 1,
    tuesday = 2,
    wednesday = 3,
    thursday = 4,
    friday = 5,
    saturday = 6,
}
export declare class IBScheduleBand extends IBObject {
    id: string;
    delay: number;
    quantity: number;
    start_time: string;
    end_time: string;
    delivery_date: Date;
    setData(data: object): void;
}
export declare class IBScheduleDay extends IBObject {
    date: string;
    complete_date: string;
    weekday: string;
    bands: Array<IBScheduleBand>;
    setData(data: object): void;
}
export declare class IBStoreLocality extends IBObject {
    id: string;
    state: string;
    neighborhood: string;
    city: string;
    tax: number;
    minPrice: number;
}
export declare class IBStoreCard extends IBObject {
    id: string;
    name: string;
    isDebit: boolean;
    isCredit: boolean;
    isVale: boolean;
    image: string;
}
export declare class IBInstallment extends IBObject {
    installments: string;
    min_price: number;
    interest: number;
    isValid(price: number): boolean;
    getFinalPriceWithInstallment(price: number): number;
    getFinalInstallment(price: number): number;
    getFinalInstallmentString(price: number): string;
}
export declare class IBPage extends IBObject {
    id: string;
    title: string;
    url_name: string;
    html_body: string;
    iframe_link: string;
    type: string;
}
export declare class IBStore extends IBObject {
    layout: IBLayout;
    menu: Array<IBMenuCategoryInterface>;
    id: string;
    name: string;
    subdomain: string;
    description: string;
    address: string;
    cep: string;
    tel: string;
    min_price_allowed: number;
    loc: Array<number>;
    hours: IBStoreHours;
    makeDelivery: boolean;
    makeCollect: boolean;
    makeShipping: boolean;
    moneyPayment: boolean;
    onlinePayment: boolean;
    checkPayment: boolean;
    offlinePayment: boolean;
    depositPayment: boolean;
    billetPayment: boolean;
    depositInfo: any;
    localities: Array<IBStoreLocality>;
    medias: Array<object>;
    available_deliveries: Array<IBScheduleDay>;
    background_color: string;
    background_image: string;
    mark: string;
    schedule: boolean;
    window_time: string;
    slogan: string;
    acceptedCards: Array<IBStoreCard>;
    creditList: Array<IBStoreCard>;
    debitList: Array<IBStoreCard>;
    valeList: Array<IBStoreCard>;
    installmentsrules: Array<IBInstallment>;
    is_market: boolean;
    whitelabel: boolean;
    google_analytics_key: string;
    fb_pixel_key: string;
    favicon: string;
    pages: Array<IBPage>;
    constructor(data?: object);
    setData(data: object): void;
    setMainMenu(menu: Array<object>): void;
    getCategory(categoryId: string): IBMenuCategoryInterface;
    getPage(pageUrl: string): IBPage;
    getMedia(media: string): string;
}
