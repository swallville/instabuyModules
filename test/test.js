'use strict';
var reflect = require('reflect-metadata')
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('module test', () => {
    it('should exist all modules', () => {
        expect(new index.IBObject()).to.exist;
    });
});
