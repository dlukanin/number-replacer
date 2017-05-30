'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var DEFAULT_REPLACE_COUNT = 3;
var DEFAULT_REPLACE_SYMBOL = '*';
var DEFAULT_NUMBER_DOT_SYMBOL = '.';

/**
 * Replaces numbers in passed value according to options
 * @param {number|string} value
 * @param {Object} [options]
 * @param {number} [options.replaceCount=3]
 * @param {string} [options.replaceSymbol='*']
 * @param {string} [options.numberDotSymbol='.']
 * @return {*}
 */
function replace(value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var replaceCount = options.replaceCount || DEFAULT_REPLACE_COUNT;
    var replaceSymbol = options.replaceSymbol || DEFAULT_REPLACE_SYMBOL;
    var numberDotSymbol = options.numberDotSymbol || DEFAULT_NUMBER_DOT_SYMBOL;

    if (!_isValid(value, numberDotSymbol)) {
        throw Error('Value should be a number');
    }

    var newValue = value.toString();
    return _replace(newValue, numberDotSymbol, replaceCount, replaceSymbol);
}

function _isValid(value, numberDotSymbol) {
    if (typeof value === 'number' && isFinite(value) && !isNaN(value)) {
        return true;
    }
    console.log(typeof value === 'undefined' ? 'undefined' : _typeof(value), value);
    return typeof value === 'string' && new RegExp('^\\d+(\\' + numberDotSymbol + '\\d+)?$').test(value);
}

function _replace(value) {
    for (var _len = arguments.length, options = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        options[_key - 1] = arguments[_key];
    }

    var numberDotSymbol = options[0],
        replaceCount = options[1],
        replaceSymbol = options[2];

    var asArray = value.split('');
    var count = asArray.indexOf(numberDotSymbol) === -1 ? replaceCount : replaceCount + 1;
    var replaced = asArray.slice(0, count).reduce(function (acc, cur) {
        acc += replaceSymbol;
        return acc;
    }, '');

    return '' + replaced + value.slice(count);
}

exports.replace = replace;