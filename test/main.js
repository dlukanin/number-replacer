const replace = require('../lib/replace.js').replace;

describe('replacer', function() {
    describe('with default args', function() {
        it('should replace numbers in simple number value', function() {
            expect(replace(123456)).toBe('***456');
            expect(replace(123e3)).toBe('***000');
            expect(replace('1234567')).toBe('***4567');
        });

        it('should replace numbers in float', function() {
            expect(replace(12.345)).toBe('****45');
            expect(replace(12345e-3)).toBe('****45');
            expect(replace('12.3456')).toBe('****456');
        });

        it('should replace numbers in object with toString', function() {
            expect(replace({toString: () => '12.345'})).toBe('****45');
        });

        it('should replace all symbols if number length < replace count', function() {
            expect(replace(12)).toBe('**');
            expect(replace('1.2')).toBe('***');
            expect(replace(1)).toBe('*');
            expect(replace('1')).toBe('*');
        });
    });

    describe('with custom args', function() {
        function curriedReplace(value) {
            return replace(value, {
                replaceCount: 5,
                replaceSymbol: '!',
                numberDotSymbol: ','
            });
        }

        it('should replace numbers in simple number value', function() {
            expect(curriedReplace(123456)).toBe('!!!!!6');
            expect(curriedReplace('123456')).toBe('!!!!!6');
        });

        it('should replace numbers in string with custom dot', function() {
            expect(curriedReplace('12,3456')).toBe('!!!!!!6');
        });

        it('should replace all symbols if number length < replace count', function() {
            expect(curriedReplace(123)).toBe('!!!');
            expect(curriedReplace('1,23')).toBe('!!!!');
            expect(curriedReplace(1)).toBe('!');
            expect(curriedReplace('1')).toBe('!');
        });

        it('should not replace numbers in float (cause of custom dot symbol)', function() {
            expect(curriedReplace(12.3456)).toBe(12.3456);
        });
    });

    it('should fail', function() {
        const emptyObj = {};
        const invalidToStringObj = {toString: () => 123};

        expect(replace('asd')).toBe('asd');
        expect(replace('qwe.rty')).toBe('qwe.rty');
        expect(replace('123.456.789')).toBe('123.456.789');
        expect(replace(null)).toBe(null);
        expect(replace(undefined)).toBeUndefined();
        expect(replace(emptyObj)).toBe(emptyObj);
        expect(replace(Infinity)).toBe(Infinity);
        expect(replace(-Infinity)).toBe(-Infinity);
        expect(replace(NaN)).toBeNaN();
        expect(replace(invalidToStringObj)).toBe(invalidToStringObj);
    });
});
