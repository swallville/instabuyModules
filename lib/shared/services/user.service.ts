import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { IBRequestService, IBCallBackRequestType } from './request.service';
import { IBUser } from '../models/user.model';
import { IBResponse, IBResponseStatus } from '../models/response.model';
import { IBObserver, IBSubject, NotifyUpdate } from '../modules/observable.module';
import { IBCartService } from './cart.service';
import { IBCoupon } from '../models/coupon.model';
import { IBCard } from '../models/ccard.model';
import { IBAddress } from '../models/address.model';
import { Observable } from "rxjs/Observable";
import { IBOrder } from "../models/order.model";

@Injectable()
export class IBUserService extends IBRequestService implements IBSubject {
    
    observers: Array<IBObserver>;
    userModel:IBUser;
    userLoggedIn:boolean = false;
    
    constructor(protected http:Http, private cartService:IBCartService) {
        super(http);
        this.userModel = new IBUser();
        this.observers = new Array();
        this.pullUser(true, true, true);
    }


    // metodos para observer, NAO SOBREESCREVER
    registerObserver(observer: IBObserver): void {
        this.observers.push(observer);
    }
    unregisterObserver(observer: IBObserver): void {
        let index = this.observers.indexOf(observer);
        if (index >= 0) this.observers.splice(index,1);
    }
    notifyObservers(message: NotifyUpdate): void {
        for (let i = 0; i < this.observers.length; i++) {
            this.observers[i].notify(message);
        }
    }


    // REALIZA A CHAMADA DO USUARIO,
    // VERIFICA SE O USUARIO ESTA LOGADO
    fetchUser():Observable<IBResponse> {
        let endpoint:string = "/user.json";
        return this.getRequest(this.createUrl(endpoint));
    }
    fetchUserCards():Observable<IBResponse> {
        let endpoint:string = "/card.json";
        return this.getRequest(this.createUrl(endpoint));
    }
    fetchUserAddresses():Observable<IBResponse> {
        let endpoint:string = "/address.json";
        return this.getRequest(this.createUrl(endpoint));
    }
    fetchUserCoupons():Observable<IBResponse> {
        let endpoint:string = "/coupon.json";
        return this.getRequest(this.createUrl(endpoint));
    }

    pullUserCards(callBack?:IBCallBackRequestType):void {
        if (!this.userModel) {
            if (callBack) callBack(new IBResponse({status:'error'}));
            return;
        }
        this.fetchUserCards().subscribe(responseModel => {
            if (responseModel.status == IBResponseStatus.success) {
                this.userModel.setCards(responseModel.data);
            }
            if (callBack) callBack(responseModel);
        });
    }
    pullUserAdresses(callBack?:IBCallBackRequestType):void {
        if (!this.userModel) {
            if (callBack) callBack(new IBResponse({status:'error'}));
            return;
        }
        this.fetchUserAddresses().subscribe(responseModel => {
            if (responseModel.status == IBResponseStatus.success) {
                this.userModel.setAddresses(responseModel.data);
            }
            if (callBack) callBack(responseModel);
        });
    }
    pullUserCoupons(callBack?:IBCallBackRequestType):void {
        if (!this.userModel) {
            if (callBack) callBack(new IBResponse({status:'error'}))
            return;
        }
        this.fetchUserCoupons().subscribe(responseModel => {
            if (responseModel.status == IBResponseStatus.success) {
                if(!responseModel.data.length){
                    // object
                    this.userModel.setCoupons([responseModel.data]);
                } else{
                    this.userModel.setCoupons(responseModel.data);
                }
            }
            if (callBack) callBack(responseModel);
        });
    }

    
    fetchUserOrders():Observable<IBResponse> {
        let endpoint:string = "/buy.json";
        let args:string = "fields=store_id,status,datetime,buyType,comment,accountInformation,shippingInfo,history,items,combinations,code,band,delivery_date,paymentInformation,coupon,buy_sum,billet_url,billet_bar_code";
        return this.getRequest(this.createUrl(endpoint, args));
    }

    pullOrders(callBack?:IBCallBackRequestType):void {
        if (!this.userModel) {
            if (callBack) callBack(new IBResponse({status:'error'}));
            return;
        }
        this.fetchUserOrders().subscribe(responseModel => {
            if (responseModel.status == IBResponseStatus.success) {
                this.userModel.setOrders(responseModel.data);
            }
            if (callBack) callBack(responseModel);
        });
    }
    
    pullUser(cardPull?:boolean, addressPull?:boolean, couponPull?:boolean, callBack?:IBCallBackRequestType):void {
        this.fetchUser().subscribe(responseModel => {
            if (responseModel.type == 'not_founded') {
                this.userLoggedIn = false;
                this.notifyObservers(NotifyUpdate.onUser);

            } else if (responseModel.status == IBResponseStatus.success) {
                this.userModel.setData(responseModel.data);
                this.userLoggedIn = true;

                if (cardPull) this.pullUserCards();
                if (addressPull) this.pullUserAdresses();
                if (couponPull) this.pullUserCoupons();

                this.notifyObservers(NotifyUpdate.onUser);
            }
            if (callBack) callBack(responseModel);
        });
    }


    // FAZ LOGIN DO USUARIO
    makeLogin(email:string, password:string, callBack?:IBCallBackRequestType):void {
        let endpoint:string = '/login.json';
        let postDocument:object = {email:email, password:password};
        this.postRequest(this.createUrl(endpoint), postDocument).subscribe(responseModel => {
            this.pullUser(true, true, true);
            if (callBack) callBack(responseModel);
            this.cartService.pullCart();
        });
    }

    // REALIZA O LOGOUT DO USUARIO
    makeLogout(callBack?:IBCallBackRequestType):void {
        let endpoint:string = '/logout.json';
        this.postRequest(this.createUrl(endpoint), {}).subscribe(responseModel => {
            if (responseModel.status == IBResponseStatus.success) {
                this.userLoggedIn = false;
                this.userModel = new IBUser();
                this.notifyObservers(NotifyUpdate.onUser);
                this.cartService.pullCart();
            }
            if (callBack) callBack(responseModel);
        });
    }

    // PEDIR TROCA DE SENHA
    requestNewPassword(email:string, callBack?:IBCallBackRequestType):void {
        let endpoint:string = '/forgotpassword.json';
        let landing_domain:string = window.location.host +'/acesso/recover_password/';
        let postDocument:object = {email:email, landing_domain:landing_domain};
        this.postRequest(this.createUrl(endpoint), postDocument).subscribe(responseModel => {
            if (callBack) callBack(responseModel);
        });
    }

    validateRecoveryPasswordToken(token:string, callBack?:IBCallBackRequestType):void {
        let endpoint:string = '/validate_rptoken.json';
        let postDocument:object = {token:token};
        this.postRequest(this.createUrl(endpoint), postDocument).subscribe(responseModel => {
            if (callBack) callBack(responseModel);
        });
    }

    changePassword(password:string, token:string, callBack?:IBCallBackRequestType):void {
        let endpoint:string = '/change_password.json';
        let postDocument:object = {password:password, token:token};
        this.postRequest(this.createUrl(endpoint), postDocument).subscribe(responseModel => {
            if (callBack) callBack(responseModel);
        });
    }
    
    updatePassword(oldPassword:string, newPassword:string, callBack?:IBCallBackRequestType):void {
        let endpoint:string = '/user.json';
        let postDocument:object = {password:oldPassword, new_password:newPassword};
        this.postRequest(this.createUrl(endpoint), postDocument).subscribe(responseModel => {
            if (callBack) callBack(responseModel);
        });
    }


    // REALIZA O REGISTRO DO USUARIO
    createUser(userModel:IBUser, password?:string, facebook_id?:string, callBack?:IBCallBackRequestType):void {
        let postDocument = userModel.registerUserDocument(password, facebook_id);
        let endpoint:string = '/user.json';
        this.putRequest(this.createUrl(endpoint), postDocument).subscribe(responseModel => {
            if (responseModel.status == IBResponseStatus.success) {
                this.userLoggedIn = true;
                this.userModel = userModel;
                this.notifyObservers(NotifyUpdate.onUser);
                this.cartService.pullCart();
            }
            if (callBack) callBack(responseModel);
        });
    }

    // REALIZA ALTERACAO NOS DADOS DO USUARIO
    saveUser(callBack?:IBCallBackRequestType):void {
        let postDocument = this.userModel.saveUserDocument();
        let endpoint:string = '/user.json';
        this.postRequest(this.createUrl(endpoint), postDocument).subscribe(responseModel => {
            if (responseModel.status == IBResponseStatus.success) {
                this.notifyObservers(NotifyUpdate.onUser);
            }
            if (callBack) callBack(responseModel);
        });
    }

    insertCCard(ccardModel:IBCard, callBack?:IBCallBackRequestType):void {
        let postDocument:object = ccardModel.registerDocument();
        let endpoint:string = '/card.json';
        this.putRequest(this.createUrl(endpoint), postDocument).subscribe(responseModel => {
            if (responseModel.status == IBResponseStatus.success) {
                ccardModel.setData(responseModel.data);
                this.userModel.insertCCard(ccardModel);
                this.notifyObservers(NotifyUpdate.onUser);
            }
            if (callBack) callBack(responseModel);
        });
    }

    deleteCCard(ccardModel:IBCard, callBack?:IBCallBackRequestType):void {
        let endpoint:string = '/card.json';
        let args:string = 'card_id='+ccardModel.id;
        this.deleteRequest(this.createUrl(endpoint, args)).subscribe(responseModel => {
            if (responseModel.status == IBResponseStatus.success) {
                this.userModel.removeCCard(ccardModel);
                this.notifyObservers(NotifyUpdate.onUser);
            }
            if (callBack) callBack(responseModel);
        });
    }

    insertAddress(addressModel:IBAddress, callBack?:IBCallBackRequestType):void {
        let postDocument:object = addressModel.registerDocument();
        let endpoint:string = '/address.json';
        this.putRequest(this.createUrl(endpoint), postDocument).subscribe(responseModel => {
            if (responseModel.status == IBResponseStatus.success) {
                addressModel.id = responseModel.data;
                this.userModel.insertAddress(addressModel);
            }
            if (callBack) callBack(responseModel);
        });
    }

    /** Pede pro servidor remover o endereco do usuario, e depois remove o endereco local, se estiver na lisa */
    deleteAddress(addressModel:IBAddress, callBack?:IBCallBackRequestType):void {
        let endpoint:string = '/address.json'
        let args:string = 'address_id='+addressModel.id;
        this.deleteRequest(this.createUrl(endpoint, args)).subscribe(responseModel => {
            this.userModel.removeAddress(addressModel);
            this.notifyObservers(NotifyUpdate.onUser);
            if (callBack) callBack(responseModel);
        });
    }

    makeZipcodeRequest(zipcode:string, callBack?:IBCallBackRequestType):void {
        let url: string = 'https://api.pagar.me/1/zipcodes/'+zipcode.toString().replace('-','');
        this.http.get(url).map(response => {
            let responseModel: IBResponse;
            if (response.ok) {
                responseModel = new IBResponse({status:'success',type:'dict',data:response.json()});
            } else {
                responseModel = new IBResponse({status:'error',type:'',data:response.statusText});
            }
            return responseModel;
        }).subscribe(responseModel => {
            callBack(responseModel);
        });
    }

}