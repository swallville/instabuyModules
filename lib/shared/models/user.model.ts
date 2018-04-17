import { IBObject } from './object.model';
import {validateEmail} from '../modules/general.module';

import { IBCard } from './ccard.model';
import { IBAddress } from './address.model';
import { IBCoupon } from './coupon.model';
import { IBOrder } from './order.model';

import { reverseBirthday } from '../modules/general.module';

export class IBUser extends IBObject {

    email:string;
    fName:string;
    lName:string;
    gender:string;
    birthday:string;
    cpf:string;
    phone:string;
    photo:string;

    cards: Array<IBCard> = [];
    addresses: Array<IBAddress> = [];
    coupons: Array<IBCoupon> = [];
    orders: Array<IBOrder> = [];

    recentOrders: number = 0;

    validateEmail:Function = validateEmail;
    reverseBirthday:Function = reverseBirthday;

    constructor () {
        super();
        this.addresses = [];
    }

    setData(data:object):void {
        super.setData(data);
    }

    setOrders(orders:Array<object>):void {
        this.orders = [];
        for (let i = 0; i < orders.length; i++) {
            this.orders.push(new IBOrder(orders[i]));
        }
        this.recentOrders = 0;
        let oneWeekAgo:Date = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        for (let i = 0; i < this.orders.length; i++) {
            if (oneWeekAgo < this.orders[i].created_at) {
                this.recentOrders++;
            }
        }
    }

    setCards(cards:Array<object>):void {
        this.cards = [];
        for (let i = 0; i < cards.length; i++) {
            this.cards.push(new IBCard(cards[i]));
        }
    }

    setAddresses(addresses:Array<object>):void {
        this.addresses = [];
        for (let i = 0; i < addresses.length; i++) {
            this.addresses.push(new IBAddress(addresses[i]));                    
        }
    }

    setCoupons(coupons:Array<object>):void {
        this.coupons = [];
        for (let i = 0; i < coupons.length; i++) {
            if(!coupons[i]['code'] || coupons[i]['code'] == null || coupons[i]['code'] == '') continue;
            this.coupons.push(new IBCoupon(coupons[i]));
        }
    }

    getPhoto():string {
        if (this.photo) return this.photo;
        if (this.gender == 'F') {
            return "https://s3-sa-east-1.amazonaws.com/ibbucket.img/default-user-female.jpg";
        } else {
            return "https://s3-sa-east-1.amazonaws.com/ibbucket.img/default-user-male.jpg";
        }
    }

    registerUserDocument(password?:string, facebookId?:string):object {
        let newUserDocument:object = {};

        newUserDocument['email'] = this.email;
        newUserDocument['fName'] = this.fName;
        newUserDocument['lName'] = this.lName;
        newUserDocument['gender'] = this.gender;
        newUserDocument['birthday'] = reverseBirthday(this.birthday);
        newUserDocument['cpf'] = this.cpf;
        newUserDocument['phone'] = this.phone;

        if (password) {
            newUserDocument['password'] = password;
        } else {
            newUserDocument['facebook_id'] = facebookId;
        }

        return newUserDocument;
    }

    saveUserDocument():object {
        let userDocument:object = {};

        userDocument['fName'] = this.fName;
        userDocument['lName'] = this.lName;
        userDocument['gender'] = this.gender;
        userDocument['birthday'] = this.birthday;
        userDocument['cpf'] = this.cpf;
        userDocument['phone'] = this.phone;

        return userDocument;
    }

    insertAddress(address:IBAddress):void {
        this.addresses.push(address);
    }
    removeAddress(address:IBAddress):void {
        let index = this.addresses.indexOf(address);
        if (index >= 0) this.addresses.splice(index,1);
    }

    insertCCard(ccard:IBCard):void {
        this.cards.push(ccard);
    }
    removeCCard(ccard:IBCard):void {
        let index = this.cards.indexOf(ccard);
        if (index >= 0) this.cards.splice(index,1);
    }

    getAddress(addressId:string):IBAddress {
        for (let i = 0; i < this.addresses.length; i++) {
            if (this.addresses[i].id == addressId) return this.addresses[i];
        }
    }

    getCard(cardId:string):IBCard {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].id == cardId) return this.cards[i];
        }
    }

    getCoupon(code:string):IBCoupon {
        for (let i = 0; i < this.coupons.length; i++) {
            if (this.coupons[i].code == code) return this.coupons[i];
        }
    }

    getOrder(code:string):IBOrder {
        for (let i = 0; i < this.orders.length; i++) {
            if (this.orders[i].code == code) return this.orders[i];
        }
    }
    
}