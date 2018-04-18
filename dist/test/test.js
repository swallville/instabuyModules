'use strict';
var reflect = require('reflect-metadata');
var expect = require('chai').expect;
var describe = require('mocha').describe;
var it = require("mocha").it;
var index = require('../dist/index.js');
describe('module tests', function () {
    it('should exist IBObject module', function () {
        expect(new index.IBObject()).to.exist;
        expect(new index.IBObject()).to.be.an("object");
    });
    it("should exist IBCard module", function () {
        expect(new index.IBCard()).to.exist;
        expect(new index.IBCard()).to.be.an("object");
    });
    it("should include IBAddress", function () {
        expect(index).to.deep.include(index.IBAddress);
    });
    it("IBAddress must be a class", function () {
        expect(new index.IBAddress()).to.be.an("object");
    });
    it("should include IBAnalytics", function () {
        expect(index).to.deep.include(index.IBAnalytics);
    });
    it("IBAnalytics must be a class", function () {
        expect(new index.IBAnalytics()).to.be.an("object");
    });
    it("should include IBCard", function () {
        expect(index).to.deep.include(index.IBCard);
    });
    it("IBCard must be a class", function () {
        expect(new index.IBCard()).to.be.an("object");
    });
    it("should include IBCart", function () {
        expect(index).to.deep.include(index.IBCart);
    });
    it("IBCart must be a class", function () {
        expect(new index.IBCart()).to.be.an("object");
    });
    it("should include IBCartService", function () {
        expect(index).to.deep.include(index.IBCartService);
    });
    it("IBCartService must have functions", function () {
        expect(index.IBCartService).to.be.an("function");
    });
    it("should include IBCategory", function () {
        expect(index).to.deep.include(index.IBCategory);
    });
    it("IBCategory must be a class", function () {
        expect(new index.IBCategory()).to.be.an("object");
    });
    it("should include IBCombination", function () {
        expect(index).to.deep.include(index.IBCombination);
    });
    it("IBCombination must be a class", function () {
        expect(new index.IBCombination()).to.be.an("object");
    });
    it("should include IBCombinationBundle", function () {
        expect(index).to.deep.include(index.IBCombinationBundle);
    });
    it("IBCombinationBundle must be a class", function () {
        expect(new index.IBCombinationBundle()).to.be.an("object");
    });
    it("should include IBCombinationBundleIngredient", function () {
        expect(index).to.deep.include(index.IBCombinationBundleIngredient);
    });
    it("IBCombinationBundleIngredient must be a class", function () {
        expect(new index.IBCombinationBundleIngredient()).to.be.an("object");
    });
    it("should include IBCoupon", function () {
        expect(index).to.deep.include(index.IBCoupon);
    });
    it("IBCoupon must be a class", function () {
        expect(new index.IBCoupon()).to.be.an("object");
    });
    it("IBDateUtil must have function getDate()", function () {
        expect(index.IBDateUtil.getDate).to.be.a('function');
    });
    it("IBDateUtil must be a class", function () {
        expect(new index.IBDateUtil()).to.be.an("object");
    });
    it("should include IBInsertQuantity", function () {
        expect(index).to.deep.include(index.IBInsertQuantity);
    });
    it("IBInsertQuantity must be a class", function () {
        expect(new index.IBInsertQuantity()).to.be.an("object");
    });
    it("should include IBItem", function () {
        expect(index).to.deep.include(index.IBItem);
    });
    it("IBItem must be a class", function () {
        expect(new index.IBItem({})).to.be.an("object");
    });
    it("should include IBItemsCallOptionsModel", function () {
        expect(index).to.deep.include(index.IBItemsCallOptionsModel);
    });
    it("IBItemsCallOptionsModel must be a class", function () {
        expect(new index.IBItemsCallOptionsModel()).to.be.an("object");
    });
    it("should include IBItemsObservable", function () {
        expect(index).to.deep.include(index.IBItemsObservable);
    });
    it("IBItemsObservable must be a class", function () {
        expect(new index.IBItemsObservable()).to.be.an("object");
    });
    it("IBItemsSortEnum must be an object", function () {
        expect(typeof (index.IBItemsSortEnum) === 'object').to.deep.equal(true);
    });
    it("should include IBLayout", function () {
        expect(index).to.deep.include(index.IBLayout);
    });
    it("IBLayout must be a class", function () {
        expect((new index.IBLayout([])).setPromotions).to.be.a("function");
        expect(new index.IBLayout([]).data).to.be.an("array").to.be.empty;
    });
    it("should include IBNotifyItemIdentifier", function () {
        expect(index).to.deep.include(index.IBNotifyItemIdentifier);
    });
    it("IBNotifyItemIdentifier must be a class", function () {
        expect(new index.IBNotifyItemIdentifier()).to.be.an("object");
    });
    it("should include IBObject", function () {
        expect(index).to.deep.include(index.IBObject);
    });
    it("IBObject must be a class", function () {
        expect(new index.IBObject()).to.be.an("object");
    });
    it("should include IBProductsList", function () {
        expect(index).to.deep.include(index.IBProductsList);
    });
    it("IBProductsList must be a class", function () {
        expect(new index.IBProductsList([])).to.be.an("object");
    });
    it("should include IBProductsListItem", function () {
        expect(index).to.deep.include(index.IBProductsListItem);
    });
    it("IBProductsListItem must be a class", function () {
        expect(new index.IBProductsListItem([])).to.be.an("object");
    });
    it("should include IBRequestService", function () {
        expect(index).to.deep.include(index.IBRequestService);
    });
    it("should include IBStoreService", function () {
        expect(index).to.deep.include(index.IBStoreService);
    });
    it("should include IBSubCategory", function () {
        expect(index).to.deep.include(index.IBSubCategory);
    });
    it("IBSubCategory must be a class", function () {
        expect(new index.IBSubCategory()).to.be.an("object");
    });
    it("should include IBUserService", function () {
        expect(index).to.deep.include(index.IBUserService);
        expect(index.IBUserService).to.be.an("function");
    });
    it("should include imagePath", function () {
        expect(typeof (index.imagePath) === "object").to.deep.equal(true);
        expect(index.imagePath).to.have.property('AMAZON_URL1');
    });
    it("imagePath has property AMAZON_URL1", function () {
        expect(index.imagePath).to.have.property('AMAZON_URL1');
    });
    it("isBirthdayReversed must be a function", function () {
        expect(typeof (index.isBirthdayReversed) === "function").to.deep.equal(true);
    });
    it("copyTextToClipboard must be a function", function () {
        expect(typeof (index.copyTextToClipboard) === "function").to.deep.equal(true);
    });
    it("EscapeHtmlPipe must be a function", function () {
        expect(typeof (index.EscapeHtmlPipe) === "function").to.deep.equal(true);
    });
    it("FieldValidation must be a class", function () {
        expect(new index.FieldValidation()).to.be.an('object');
    });
    it("fixFloatPoint must be a function", function () {
        expect(typeof (index.fixFloatPoint) === "function").to.deep.equal(true);
    });
    it("isEmpty must be a function", function () {
        expect(typeof (index.isEmpty) === "function").to.deep.equal(true);
    });
    it("NotifyUpdate must be an object", function () {
        expect(typeof (index.NotifyUpdate) === "object").to.deep.equal(true);
    });
    it("priceToString must be a function", function () {
        expect(typeof (index.priceToString) === "function").to.deep.equal(true);
    });
    it("removeSpecialCharacters must be a function", function () {
        expect(typeof (index.removeSpecialCharacters) === "function").to.deep.equal(true);
    });
    it("reverseBirthday must be a function", function () {
        expect(typeof (index.reverseBirthday) === "function").to.deep.equal(true);
    });
    it("SafeUrlPipe must be a function", function () {
        expect(typeof (index.SafeUrlPipe) === "function").to.deep.equal(true);
    });
    it("tokenGenerator must be a function", function () {
        expect(typeof (index.tokenGenerator) === "function").to.deep.equal(true);
    });
    it("unreverseBirthday must be a function", function () {
        expect(typeof (index.unreverseBirthday) === "function").to.deep.equal(true);
    });
    it("validateCep must be a function", function () {
        expect(typeof (index.validateCep) === "function").to.deep.equal(true);
    });
    it("validateEmail must be a function", function () {
        expect(typeof (index.validateEmail) === "function").to.deep.equal(true);
    });
});
//# sourceMappingURL=test.js.map