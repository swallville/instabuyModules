import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";

import 'rxjs/add/operator/map' 

import {stringify} from "qs"

import { IBResponse, IBResponseStatus } from "../models/response.model";
import { Observable } from "rxjs/Observable";
import { IBProduct } from "../models/product.model";
import { IBCombination } from "../models/combination.model";
import { IBProductsKit } from "../models/productskit.model";
import { IBItem } from "../models/item.model";
import { IBProductsList } from "../models/list.model";

export type IBCallBackRequestType = (responseModel:IBResponse)=>void;
export type IBCallBackItemsType = (products:Array<IBItem>, responseModel:IBResponse)=>void
export type IBCallBackProductType = (productModel:IBProduct, responseModel:IBResponse)=>void
export type IBCallBackKitType = (combination:IBProductsKit, responseModel:IBResponse)=>void
export type IBCallBackListsType = (lists:Array<IBProductsList>, responseModel:IBResponse)=>void

@Injectable()
export class IBRequestService {
    // protected storeId: string = "56e2df40072d4127659b32d5"; // laconfesserie
    // protected storeId: string = "55ca6b49072d4167d3a815e9"; // hortimais
    // protected storeId: string = "56d5afd6072d4145fc30d70e"; // don durica
    // protected storeId: string = "56fc1959072d4150caab0f60"; // benutri
    // protected storeId: string = "57edc21b072d41439fc24175"; // pomar
    // protected storeId: string = "55cb8eeb072d416ddda815e7"; // pao dourado
    // protected storeId: string = "55c17d73072d4126ea180fe5"; // cayke store
    // protected storeId: string = "58ab8cf7072d412f6a199f88"; // teclar

    
    private domain: string = "https://instabuy.com.br";
    //private domain: string = "http://127.0.0.1:8000";
    protected storeId: string;
    protected subdomain: string;
    protected custom_domain: string;
    private api: string = "/apiv3";

    constructor(protected http: Http) {
        if (window.location.host.replace('www.','').indexOf('localhost:') == -1) {
            this.startProccess();
        } else {
            this.storeId = "55c17d73072d4126ea180fe5";
        }
    }

    private startProccess() {   
        this.storeId = undefined;
        this.subdomain = undefined;
        this.custom_domain = undefined;

        let _host: string = window.location.host.replace('www.','');
        if (_host.indexOf('instabuy.com.br') == -1) {
            this.domain = location.protocol+"//"+_host;
            this.custom_domain = _host;
        } else {
            this.subdomain = _host.split('.')[0];
        }
    }
    
    removeSpaces(value:string):string {
        if (value)
            return value.split(' ').join('');
        return "";
    }

    // PREPARACAO DA CHAMADA
    // NAO EH PRECISO OBRIGATORIO OS CAMPOS DE ARGS, DOMAIN, API
    createUrl(endpoint:string, args:string = '', domain:string = '', api:string = ''):string {
        endpoint = this.removeSpaces(endpoint);
        args = this.removeSpaces(args);
        domain = this.removeSpaces(domain);
        api = this.removeSpaces(api);

        if (!domain) domain = this.domain;
        if (!api) api = this.api;
        if (endpoint[0]!='/') endpoint = '/' + endpoint;
        if (endpoint.lastIndexOf('.json') == -1) endpoint += '.json';
        if (args.indexOf('store_id=') == -1 && args.indexOf('subdomain=') == -1) {
            if (args.length > 0 && args[args.length-1] != '&') args += '&';
            if (this.storeId) args += 'store_id='+this.storeId;
            else if (this.subdomain) args += 'subdomain='+this.subdomain;
            else if (this.custom_domain) args += 'custom_domain='+this.custom_domain;
        }
        if (args && args[0]!='?') args = '?' + args;

        let url: string = domain + api + endpoint + args;
        return url;
    }

    // CHAMADA GERAL
    getRequest(url:string):Observable<IBResponse> {
        let options = new RequestOptions();
        options.withCredentials = true;
        return this.http.get(url, options)
            .map(response => new IBResponse(response.json()));
    }

    postRequest(url:string, postDocument:object):Observable<IBResponse> {
        let options = new RequestOptions();
        options.withCredentials = true;
        return this.http.post(url, postDocument, options)
            .map(response => new IBResponse(response.json()));
    }

    postXWWFormUrlEnconded(url: string, postDocument: object):Observable<IBResponse> {
        let options = new RequestOptions();
        options.headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        options.withCredentials = true;

        let body = stringify({json_data: JSON.stringify(postDocument)});
        return this.http.post(url, body, options)
            .map(response => new IBResponse(response.json()));
    }

    putRequest(url:string, postDocument:object):Observable<IBResponse> {
        let options = new RequestOptions();
        options.withCredentials = true;
        return this.http.put(url, postDocument, options)
            .map(response => new IBResponse(response.json()));
    }

    deleteRequest(url:string):Observable<IBResponse> {
        let options = new RequestOptions();
        options.withCredentials = true;
        return this.http.delete(url, options)
            .map(response => new IBResponse(response.json()));
    }

    //PUBLIC METHODS
    public uploadFile(file: File):Observable<IBResponse> {
        const formData = new FormData();
        formData.append('file', file);

        const headers = new Headers();
        // It is very important to leave the Content-Type empty
        // do not use headers.append('Content-Type', 'multipart/form-data');
        const options = new RequestOptions({headers: headers});

        return this.http.post(this.createUrl('upload_file.json'), formData, options)
            .map(response => new IBResponse(response.json()));
    }
}