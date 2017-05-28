var chai = require('chai');
var Replacer = require('../lib/replacer.js').Replacer;
var expect = chai.expect;
var replace = require('../lib/replace.js').replace;

describe('replacer', function() {
    it('should replace numbers in simple number value', function() {
        var replacer = new Replacer();
        expect(replacer.replace(123456)).to.eq('***456');
    });

    it('should replace numbers in float', function() {
        var replacer = new Replacer();
        expect(replacer.replace(12.345)).to.eq('****45');
    });
});

describe('replacer 2', function() {
    it('should replace numbers in simple number value', function() {
        expect(replace(123456)).to.eq('***456');
        expect(replace('123456')).to.eq('***456');
    });

    it('should replace numbers in float', function() {
        expect(replace(12.345)).to.eq('****45');
        expect(replace('12.345')).to.eq('****45');
    });

    it('should fail', function() {
        expect(replace.bind(null, 'asd')).to.throw('Value should be a number');
        expect(replace.bind(null, 'qwe.rty')).to.throw('Value should be a number');
        expect(replace.bind(null, '123.456.789')).to.throw('Value should be a number');
    });
});
