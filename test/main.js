var chai = require('chai');
var expect = chai.expect;

var replace = require('../lib/replace.js').replace;

describe('replacer', function() {
    describe('with default args', function() {
        it('should replace numbers in simple number value', function() {
            expect(replace(123456)).to.eq('***456');
            expect(replace('123456')).to.eq('***456');
        });

        it('should replace numbers in float', function() {
            expect(replace(12.345)).to.eq('****45');
            expect(replace('12.345')).to.eq('****45');
        });

        it('should replace all symbols if number length < replace count', function() {
            expect(replace(12)).to.eq('**');
            expect(replace('1.2')).to.eq('***');
            expect(replace(1)).to.eq('*');
            expect(replace('1')).to.eq('*');
        });
    });

    describe('with custom args', function() {
        var curriedReplace = function(value) {
            return replace(value, {replaceCount: 5, replaceSymbol: '!', numberDotSymbol: ','});
        };

        it('should replace numbers in simple number value', function() {
            expect(curriedReplace(123456)).to.eq('!!!!!6');
            expect(curriedReplace('123456')).to.eq('!!!!!6');
        });

        it('should replace numbers in float', function() {
            expect(curriedReplace(12.3456)).to.eq('!!!!!!6');
        });

        it('should replace numbers in string with custom dot', function() {
            expect(curriedReplace('12,3456')).to.eq('!!!!!!6');
        });

        it('should replace all symbols if number length < replace count', function() {
            expect(curriedReplace(123)).to.eq('!!!');
            expect(curriedReplace('1,23')).to.eq('!!!!');
            expect(curriedReplace(1)).to.eq('!');
            expect(curriedReplace('1')).to.eq('!');
        });
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
