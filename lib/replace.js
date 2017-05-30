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
function replace(value, options) {
    var options = options || {};
    var replaceCount = options.replaceCount || DEFAULT_REPLACE_COUNT;
    var replaceSymbol = options.replaceSymbol || DEFAULT_REPLACE_SYMBOL;
    var numberDotSymbol = options.numberDotSymbol || DEFAULT_NUMBER_DOT_SYMBOL;

    if (!(_isValid(value))) {
        throw Error('Value should be a number');
    }

    var newValue = value.toString();
    return _replace(newValue);

    function _isValid() {
        if (typeof value === 'number' && isFinite(value) && !isNaN(value)) {
            return true;
        }

        return typeof value === 'string' && new RegExp('^\\d+(\\' + numberDotSymbol + '\\d+)?$').test(value);
    }

    function _replace(value) {
        var asArray = value.split('');
        var count = (asArray.indexOf(numberDotSymbol) === -1)
            ? replaceCount
            : replaceCount + 1;
        var replaced = asArray.slice(0, count).reduce(function(acc, cur) {
            acc += replaceSymbol;
            return acc;
        }, '');

        return replaced + value.slice(count);
    }
}

exports.replace = replace;
