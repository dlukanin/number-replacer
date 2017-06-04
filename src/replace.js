var DEFAULT_REPLACE_COUNT = 3;
var DEFAULT_REPLACE_SYMBOL = '*';
var DEFAULT_NUMBER_DOT_SYMBOL = '.';

/**
 * Replaces numbers in passed value according to options
 * @param {number|string|*} value
 * @param {Object} [options]
 * @param {number} [options.replaceCount=3]
 * @param {string} [options.replaceSymbol='*']
 * @param {string} [options.numberDotSymbol='.']
 * @return {*}
 */
function replace(value, options = {}) {
    if (value === null || typeof value === 'undefined') {
        return value;
    }

    const newValue = value.toString();
    const numberDotSymbol = options.numberDotSymbol || DEFAULT_NUMBER_DOT_SYMBOL;

    if (!_isValid(newValue, numberDotSymbol)) {
        return value;
    }

    const replaceCount = options.replaceCount || DEFAULT_REPLACE_COUNT;
    const replaceSymbol = options.replaceSymbol || DEFAULT_REPLACE_SYMBOL;

    return _replace(newValue, numberDotSymbol, replaceCount, replaceSymbol);
}

function _isValid(value, numberDotSymbol) {
    return typeof value === 'string' && new RegExp(`^\\d+(\\${numberDotSymbol}\\d+)?$`).test(value);
}

function _replace(value, ...options) {
    const [numberDotSymbol, replaceCount, replaceSymbol] = options;
    const asArray = value.split('');
    const count = (asArray.indexOf(numberDotSymbol) === -1)
        ? replaceCount
        : replaceCount + 1;
    const replaced = asArray.slice(0, count).reduce(function(acc) {
        acc += replaceSymbol;
        return acc;
    }, '');

    return `${replaced}${value.slice(count)}`;
}

exports.replace = replace;
