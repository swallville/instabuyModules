import {IBObject} from "./object.model";
import {IBResponse} from "./response.model";
import {IBLayout} from "./layout.model";

import {priceToString} from "../modules/general.module";
import { IBDateUtil } from './dateutil.model';

export interface IBMenuSubCategoryInterface {
    id:string,
    title:string
}

export interface IBMenuCategoryInterface {
    id:string,
    title:string,
    subCategories: Array<IBMenuSubCategoryInterface>
}

export interface IBWorkHourInterface {
    allDay?:boolean,
    close?:boolean,
    openHour?:string,
    closeHour?:string
}

export class IBStoreHours extends IBObject {
    utc:string;
    
    sunday:IBWorkHourInterface;
    monday:IBWorkHourInterface;
    tuesday:IBWorkHourInterface;
    wednesday:IBWorkHourInterface;
    thursday:IBWorkHourInterface;
    friday:IBWorkHourInterface;
    saturday:IBWorkHourInterface;

    setData (data:object):void {
        let element:object;
        // issue: https://github.com/Microsoft/TypeScript/pull/14195
        // for..in has to be placed like Object
        // TODO: fix
        for (let key in Object(data)) {
            element = data[key];
            if (element['24h']) {
                element['allDay'] = element['24h'];
                delete element['24h'];
            }
            this[key] = element;
        }
    }
}

export enum IBDayEnum {
    sunday,     // domingo
    monday,     // segunda
    tuesday,    // tercao
    wednesday,  // quarta
    thursday,   // quinta
    friday,     // sexta
    saturday    // sabado
}

export class IBScheduleBand extends IBObject {
    id:string;
    delay: number;
    quantity: number;
    start_time: string;
    end_time: string;
    delivery_date:Date;

    setData(data:object):void {
        super.setData(data);

        if (this.delivery_date)
            this.delivery_date = IBDateUtil.getDate(data['delivery_date']);
    }
}
export class IBScheduleDay extends IBObject {
    date: string; // 'DD/MM'
    complete_date: string; // 'DD/MM/YYYY'
    weekday: string;
    bands: Array<IBScheduleBand>;

    setData(data:object):void {
        super.setData(data);
        this.bands = [];
        for (let i = 0; i < data['bands'].length; i++) {
            this.bands.push(new IBScheduleBand(data['bands'][i]));
        }
    }
}

export class IBStoreLocality extends IBObject {
    id:string;
    state:string;
    neighborhood:string;
    city:string;
    tax:number;
    minPrice:number;
}

export class IBStoreCard extends IBObject {
    id: string;
    name: string;
    isDebit: boolean;
    isCredit: boolean;
    isVale: boolean;
    image: string;
}

export class IBInstallment extends IBObject {
    installments: string;
    min_price: number;
    interest: number;

    isValid(price: number){
        if(price >= this.min_price)
            return true;
        else
            return false;
    }

    getFinalPriceWithInstallment(price: number){
        return (price*Math.pow(1+(this.interest)/100, Number(this.installments.substring(0, 1))));
    }

    getFinalInstallment(price: number){
        return this.getFinalPriceWithInstallment(price)/Number(this.installments.substring(0, 1));
    }

    getFinalInstallmentString(price: number){
        let installment_string = '';
        installment_string += this.installments;
        if(this.interest == 0)
            installment_string += ' sem juros de ';
        else
            installment_string += ' com juros (' + this.interest + '% ao mês) de ';
        installment_string += 'R$ ' + priceToString(this.getFinalInstallment(price));
        return installment_string;
    }
}

export class IBPage extends IBObject {
    id: string;
    title: string;
    url_name: string;
    html_body: string;
    iframe_link: string;
    type: string;
}


export class IBStore extends IBObject {
    
    layout: IBLayout;
    menu: Array<IBMenuCategoryInterface>;

    //
    // informações da loja
    //
    id: string;         // id da loja
    name:string;        // nome da loja
    subdomain:string;   // subdominio da loja no instabuy
    description:string; // descricao da loja
    address:string;     // endereço da loja
    cep:string;         // cep da loja
    tel:string;         // telefone da loja

    min_price_allowed: number;  // preco mínimo para aceitar novas compras
    loc:Array<number>; // localização espacial da loja [longitude, latitude]
    hours:IBStoreHours;    // horários de funcionamento da loja
    
    // formas de entrega e pagamentos
    makeDelivery:boolean;   // loja realiza delivery
    makeCollect:boolean;    // loja permite usuario coletar compra no recinto
    makeShipping:boolean;   // loja realiza venda através de transportadora
    moneyPayment:boolean;   // loja aceita pagamento em dinheiro
    onlinePayment:boolean;  // loja aceita pagamento online
    checkPayment:boolean;   // loja aceita cheque como forma de pagamento
    offlinePayment:boolean; // loja aceita passar o cartão na maquina da adquirente (leva até o cliente)
    depositPayment:boolean; // loja aceita deposito bancario
    billetPayment:boolean;
    depositInfo; //info about deposit account

    localities:Array<IBStoreLocality>;  // localidades de atuação da loja
    medias:Array<object>; //[{"facebook_media": "https://www.facebook.com/ajsdjs"}] // mídias socias da loja

    available_deliveries:Array<IBScheduleDay>; // dias e faixas disponíveis para agendamento

    background_color:string;    // cor primária da loja (hexadecimal)
    background_image:string;    // chave de imagem que a loja quer usar como fundo de tela
    mark:string;    // logo da loja

    schedule:boolean;   // se a loja faz agendamento
    window_time:string; // janela para entrega da loja
    slogan: string; // slogan da loja

    acceptedCards: Array<IBStoreCard>;
    creditList: Array<IBStoreCard>;
    debitList: Array<IBStoreCard>;
    valeList: Array<IBStoreCard>;

    installmentsrules: Array<IBInstallment>;

    is_market:boolean;
    whitelabel:boolean;

    google_analytics_key:string;
    fb_pixel_key:string;
    favicon:string;

    pages: Array<IBPage>;


    constructor(data?:object) {
        super();
        this.layout = new IBLayout([]);
        this.menu = [];
        this.loc = [];
        this.localities = [];
        this.available_deliveries = [];
        this.acceptedCards = [];
        this.creditList = [];
        this.debitList = [];
        this.valeList = [];
        this.installmentsrules = [];

        if (data) this.setData(data);
    }

    setData(data:object):void {
        super.setData(data);

        if (data['localities']) {
            this.localities = [];
            for (let i = 0; i < data['localities'].length; i++) {
                this.localities.push(new IBStoreLocality(data['localities'][i]));
            }
        }
        if (data['available_deliveries']) {
            this.available_deliveries = [];
            for (let i = 0; i < data['available_deliveries'].length; i++) {
                this.available_deliveries.push(new IBScheduleDay(data['available_deliveries'][i]));
            }
        }
        if (data['acceptedCards']) {
            this.acceptedCards = [];
            for (let i = 0; i < data['acceptedCards'].length; i++) {
                this.acceptedCards.push(new IBStoreCard(data['acceptedCards'][i]));
            }
            let auxStoreCard:IBStoreCard;
            this.debitList = [];
            this.creditList = [];
            this.valeList = [];
            for (let i = 0; i < this.acceptedCards.length; i++) {
                auxStoreCard = this.acceptedCards[i];
                if (auxStoreCard.isDebit) {
                    this.debitList.push(auxStoreCard);
                }
                if (auxStoreCard.isCredit) {
                    this.creditList.push(auxStoreCard);
                }
                if (auxStoreCard.isVale) {
                    this.valeList.push(auxStoreCard);
                }
            }
        }
        this.offlinePayment = false;
        if (data['offlinePayment'] && this.acceptedCards.length) {
            this.offlinePayment = true;
        }
        if (data['installmentsrules']) {
            this.installmentsrules = [];
            for (let i = 0; i < data['installmentsrules'].length; i++) {
                this.installmentsrules.push(new IBInstallment(data['installmentsrules'][i]));
            }
        }
        if (data['pages']) {
            this.pages = [];
            for (let i = 0; i < data['pages'].length; i++) {
                this.pages.push(new IBPage(data['pages'][i]));
            }
        }
    }

    setMainMenu (menu:Array<object>): void {
        this.menu = [];
        let menuCategoryInterface: IBMenuCategoryInterface;
        let menuSubInterface: IBMenuSubCategoryInterface;
        let subCategories: object[];
        for (var i = 0; i < menu.length; i++) {
            menuCategoryInterface = {
                id: menu[i]['id'],
                title: menu[i]['title'],
                subCategories: []
            };
            subCategories = menu[i]['sub_categories'];
            for (var j = 0; j < subCategories.length; j++) {
                menuSubInterface = {
                    id: subCategories[j]['id'],
                    title: subCategories[j]['title']
                }
                menuCategoryInterface.subCategories.push(menuSubInterface);
            }
            this.menu.push(menuCategoryInterface);
        }
    }

    getCategory(categoryId:string):IBMenuCategoryInterface {
        for (let i = 0; i < this.menu.length; i++) {
            if (categoryId == this.menu[i].id) {
                return this.menu[i];
            }
        }
    }

    getPage(pageUrl:string):IBPage {
        for (let i = 0; i < this.pages.length; i++) {
            if (pageUrl == this.pages[i].url_name) {
                return this.pages[i];
            }
        }
    }

    getMedia(media:string):string {
        let searchMedia:string = '';
        if (media == 'facebook') {
            searchMedia = 'facebook_media';
        }
        if (media == 'instagram') {
            searchMedia = 'instagram_media';
        }
        if (media == 'twitter') {
            searchMedia = 'twitter_media';
        }
        if (media == 'google+') {
            searchMedia = 'googlePlus_media';
        }
        for (let i = 0; i < this.medias.length; i++) {
            if (this.medias[i][searchMedia]) {
                return this.medias[i][searchMedia];
            }
        }
        return undefined;
    }

}