var chai = require('chai');
var expect = chai.expect;
var replace = require('../lib/replace.js').replace;

describe('replacer', function() {
    it('should replace numbers in simple number value', function() {
        expect(replace(123456)).to.eq('***456');
        expect(replace('123456')).to.eq('***456');
    });

    it('should replace numbers in float', function() {
        expect(replace(12.345)).to.eq('****45');
        expect(replace('12.345')).to.eq('****45');
    });

    it('should fail', function() {
        var errorMessage = 'Value should be a number';

        expect(replace.bind(null, 'asd')).to.throw(errorMessage);
        expect(replace.bind(null, 'qwe.rty')).to.throw(errorMessage);
        expect(replace.bind(null, '123.456.789')).to.throw(errorMessage);
        expect(replace.bind(null, null)).to.throw(errorMessage);
        expect(replace.bind(null, undefined)).to.throw(errorMessage);
        expect(replace.bind(null, {})).to.throw(errorMessage);
        expect(replace.bind(null, {toString: function() {return '12.345'}})).to.throw(errorMessage);
        expect(replace.bind(null, Infinity)).to.throw(errorMessage);
        expect(replace.bind(null, -Infinity)).to.throw(errorMessage);
        expect(replace.bind(null, NaN)).to.throw(errorMessage);
    });
});
