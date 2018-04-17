'use strict';
var reflect = require('reflect-metadata')
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('module tests', () => {
    it('should exist IBObject module', () => {
        expect(new index.IBObject()).to.exist;
    });
    it("should exist IBCard module", () => {
        expect(new index.IBCard()).to.exist;
    });
});
