const DEFAULT_REPLACE_COUNT = 3;
const DEFAULT_REPLACE_SYMBOL = '*';
const DEFAULT_NUMBER_DOT_SYMBOL = '.';

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
        throw new Error('Value is not a valid number');
    }

    const newValue = value.toString();
    const numberDotSymbol = options.numberDotSymbol || DEFAULT_NUMBER_DOT_SYMBOL;

    if (!_isValid(newValue, numberDotSymbol)) {
        throw new Error('Value is not a valid number');
    }

    const replaceCount = options.replaceCount || DEFAULT_REPLACE_COUNT;
    const replaceSymbol = options.replaceSymbol || DEFAULT_REPLACE_SYMBOL;

    return _replace(newValue, numberDotSymbol, replaceCount, replaceSymbol);
}

function _isValid(value, numberDotSymbol) {
    if (value === null || typeof value === 'undefined') {
        return false;
    }

    if (numberDotSymbol.length !== 1) {
        return false;
    }

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
