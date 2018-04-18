'use strict';
var reflect = require('reflect-metadata')
var expect = require('chai').expect;
var describe = require('mocha').describe
var it = require("mocha").it;
var index = require('../dist/index.js');

describe('module tests', () => {
    it('should exist IBObject module', () => {
        expect(new index.IBObject()).to.exist;
    });

    it("should exist IBCard module", () => {
        expect(new index.IBCard()).to.exist;
    });

    it("should include IBAddress", () => {
        expect(index).to.deep.include(index.IBAddress);
    });

    it("should include IBAnalytics", () => {
        expect(index).to.deep.include(index.IBAnalytics);
    });

    it("should include IBCard", () => {
        expect(index).to.deep.include(index.IBCard);
    });

    it("should include IBCart", () => {
        expect(index).to.deep.include(index.IBCart);
    });

    it("should include IBCartService", () => {
        expect(index).to.deep.include(index.IBCartService);
    });

    it("should include IBCategory", () => {
        expect(index).to.deep.include(index.IBCategory);
    });

    it("should include IBCombination", () => {
        expect(index).to.deep.include(index.IBCombination);
    });

    it("should include IBCombinationBundle", () => {
        expect(index).to.deep.include(index.IBCombinationBundle);
    });

    it("should include IBCombinationBundleIngredient", () => {
        expect(index).to.deep.include(index.IBCombinationBundleIngredient);
    });

    it("should include IBCoupon", () => {
        expect(index).to.deep.include(index.IBCoupon);
    });

    it("IBDateUtil must have function getDate()", () => {
      expect(index.IBDateUtil.getDate).to.be.a('function');
    });

    it("should include IBInsertQuantity", () => {
        expect(index).to.deep.include(index.IBInsertQuantity);
    });

    it("should include IBItem", () => {
        expect(index).to.deep.include(index.IBItem);
    });

    it("should include IBItemsCallOptionsModel", () => {
        expect(index).to.deep.include(index.IBItemsCallOptionsModel);
    });

    it("should include IBItemsObservable", () => {
        expect(index).to.deep.include(index.IBItemsObservable);
    });

    it("IBItemsSortEnum must be an object", () => {
        expect(typeof(index.IBItemsSortEnum) === 'object').to.deep.equal(true);
    });

    it("should include IBLayout", () => {
        expect(index).to.deep.include(index.IBLayout);
    });

    it("should include IBNotifyItemIdentifier", () => {
        expect(index).to.deep.include(index.IBNotifyItemIdentifier);
    });

    it("should include IBObject", () => {
        expect(index).to.deep.include(index.IBObject);
    });

    it("should include IBProductsList", () => {
        expect(index).to.deep.include(index.IBProductsList);
    });

    it("should include IBProductsListItem", () => {
        expect(index).to.deep.include(index.IBProductsListItem);
    });

    it("should include IBRequestService", () => {
        expect(index).to.deep.include(index.IBRequestService);
    });

    it("should include IBStoreService", () => {
        expect(index).to.deep.include(index.IBStoreService);
    });

    it("should include IBSubCategory", () => {
        expect(index).to.deep.include(index.IBSubCategory);
    });

    it("should include IBUserService", () => {
        expect(index).to.deep.include(index.IBUserService);
    });

    it("should include imagePath", () => {
        expect(typeof(index.imagePath) === "object").to.deep.equal(true);
    });

    it("isBirthdayReversed must be a function", () => {
        expect(typeof(index.isBirthdayReversed) === "function").to.deep.equal(true);
    });

    it("copyTextToClipboard must be a function", () => {
        expect(typeof(index.copyTextToClipboard) === "function").to.deep.equal(true);
    });

    it("EscapeHtmlPipe must be a function", () => {
        expect(typeof(index.EscapeHtmlPipe) === "function").to.deep.equal(true);
    });

    it("FieldValidation must be a class", () => {
        expect(new index.FieldValidation()).to.be.an('object');
    });

    it("fixFloatPoint must be a function", () => {
        expect(typeof(index.fixFloatPoint) === "function").to.deep.equal(true);
    });

    it("isEmpty must be a function", () => {
        expect(typeof(index.isEmpty) === "function").to.deep.equal(true);
    });

    it("NotifyUpdate must be an object", () => {
        expect(typeof(index.NotifyUpdate) === "object").to.deep.equal(true);
    });

    it("priceToString must be a function", () => {
        expect(typeof(index.priceToString) === "function").to.deep.equal(true);
    });

    it("removeSpecialCharacters must be a function", () => {
        expect(typeof(index.removeSpecialCharacters) === "function").to.deep.equal(true);
    });

    it("reverseBirthday must be a function", () => {
        expect(typeof(index.reverseBirthday) === "function").to.deep.equal(true);
    });

    it("SafeUrlPipe must be a function", () => {
        expect(typeof(index.SafeUrlPipe) === "function").to.deep.equal(true);
    });

    it("tokenGenerator must be a function", () => {
        expect(typeof(index.tokenGenerator) === "function").to.deep.equal(true);
    });

    it("unreverseBirthday must be a function", () => {
        expect(typeof(index.unreverseBirthday) === "function").to.deep.equal(true);
    });

    it("validateCep must be a function", () => {
        expect(typeof(index.validateCep) === "function").to.deep.equal(true);
    });

    it("validateEmail must be a function", () => {
        expect(typeof(index.validateEmail) === "function").to.deep.equal(true);
    });
});
