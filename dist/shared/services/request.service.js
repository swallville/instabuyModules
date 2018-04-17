"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var qs_1 = require("qs");
var response_model_1 = require("../models/response.model");
var IBRequestService = (function () {
    function IBRequestService(http) {
        this.http = http;
        // protected storeId: string = "56e2df40072d4127659b32d5"; // laconfesserie
        // protected storeId: string = "55ca6b49072d4167d3a815e9"; // hortimais
        // protected storeId: string = "56d5afd6072d4145fc30d70e"; // don durica
        // protected storeId: string = "56fc1959072d4150caab0f60"; // benutri
        // protected storeId: string = "57edc21b072d41439fc24175"; // pomar
        // protected storeId: string = "55cb8eeb072d416ddda815e7"; // pao dourado
        // protected storeId: string = "55c17d73072d4126ea180fe5"; // cayke store
        // protected storeId: string = "58ab8cf7072d412f6a199f88"; // teclar
        this.domain = "https://instabuy.com.br";
        this.api = "/apiv3";
        if (window.location.host.replace('www.', '').indexOf('localhost:') == -1) {
            this.startProccess();
        }
        else {
            this.storeId = "55c17d73072d4126ea180fe5";
        }
    }
    IBRequestService.prototype.startProccess = function () {
        this.storeId = undefined;
        this.subdomain = undefined;
        this.custom_domain = undefined;
        var _host = window.location.host.replace('www.', '');
        if (_host.indexOf('instabuy.com.br') == -1) {
            this.domain = location.protocol + "//" + _host;
            this.custom_domain = _host;
        }
        else {
            this.subdomain = _host.split('.')[0];
        }
    };
    IBRequestService.prototype.removeSpaces = function (value) {
        if (value)
            return value.split(' ').join('');
        return "";
    };
    // PREPARACAO DA CHAMADA
    // NAO EH PRECISO OBRIGATORIO OS CAMPOS DE ARGS, DOMAIN, API
    IBRequestService.prototype.createUrl = function (endpoint, args, domain, api) {
        if (args === void 0) { args = ''; }
        if (domain === void 0) { domain = ''; }
        if (api === void 0) { api = ''; }
        endpoint = this.removeSpaces(endpoint);
        args = this.removeSpaces(args);
        domain = this.removeSpaces(domain);
        api = this.removeSpaces(api);
        if (!domain)
            domain = this.domain;
        if (!api)
            api = this.api;
        if (endpoint[0] != '/')
            endpoint = '/' + endpoint;
        if (endpoint.lastIndexOf('.json') == -1)
            endpoint += '.json';
        if (args.indexOf('store_id=') == -1 && args.indexOf('subdomain=') == -1) {
            if (args.length > 0 && args[args.length - 1] != '&')
                args += '&';
            if (this.storeId)
                args += 'store_id=' + this.storeId;
            else if (this.subdomain)
                args += 'subdomain=' + this.subdomain;
            else if (this.custom_domain)
                args += 'custom_domain=' + this.custom_domain;
        }
        if (args && args[0] != '?')
            args = '?' + args;
        var url = domain + api + endpoint + args;
        return url;
    };
    // CHAMADA GERAL
    IBRequestService.prototype.getRequest = function (url) {
        var options = new http_1.RequestOptions();
        options.withCredentials = true;
        return this.http.get(url, options)
            .map(function (response) { return new response_model_1.IBResponse(response.json()); });
    };
    IBRequestService.prototype.postRequest = function (url, postDocument) {
        var options = new http_1.RequestOptions();
        options.withCredentials = true;
        return this.http.post(url, postDocument, options)
            .map(function (response) { return new response_model_1.IBResponse(response.json()); });
    };
    IBRequestService.prototype.postXWWFormUrlEnconded = function (url, postDocument) {
        var options = new http_1.RequestOptions();
        options.headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        options.withCredentials = true;
        var body = qs_1.stringify({ json_data: JSON.stringify(postDocument) });
        return this.http.post(url, body, options)
            .map(function (response) { return new response_model_1.IBResponse(response.json()); });
    };
    IBRequestService.prototype.putRequest = function (url, postDocument) {
        var options = new http_1.RequestOptions();
        options.withCredentials = true;
        return this.http.put(url, postDocument, options)
            .map(function (response) { return new response_model_1.IBResponse(response.json()); });
    };
    IBRequestService.prototype.deleteRequest = function (url) {
        var options = new http_1.RequestOptions();
        options.withCredentials = true;
        return this.http.delete(url, options)
            .map(function (response) { return new response_model_1.IBResponse(response.json()); });
    };
    //PUBLIC METHODS
    IBRequestService.prototype.uploadFile = function (file) {
        var formData = new FormData();
        formData.append('file', file);
        var headers = new http_1.Headers();
        // It is very important to leave the Content-Type empty
        // do not use headers.append('Content-Type', 'multipart/form-data');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.createUrl('upload_file.json'), formData, options)
            .map(function (response) { return new response_model_1.IBResponse(response.json()); });
    };
    return IBRequestService;
}());
IBRequestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], IBRequestService);
exports.IBRequestService = IBRequestService;
//# sourceMappingURL=request.service.js.map