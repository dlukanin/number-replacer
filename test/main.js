var chai = require('chai');
var Replacer = require('../lib/replacer.js').Replacer;
var expect = chai.expect;

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