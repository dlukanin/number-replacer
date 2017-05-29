var DEFAULT_NUMBER_COUNT = 3;
var DEFAULT_REPLACE_SYMBOL = '*';
var DEFAULT_NUMBER_DOT_SYMBOL = '.';

/**
 * Replaces numbers in passed value according to options
 * @param {number|string} value
 * @param {Object} [options]
 * @param {number} [options.numberCount=3]
 * @param {string} [options.replaceSymbol='*']
 * @param {string} [options.numberDotSymbol='.']
 * @return {*}
 */
function replace(value, options) {
    var options = options || {};
    var replace_count = options.numberCount || DEFAULT_NUMBER_COUNT;
    var replaceSymbol = options.replaceSymbol || DEFAULT_REPLACE_SYMBOL;
    var numberDotSymbol = options.numberDotSymbol || DEFAULT_NUMBER_DOT_SYMBOL;

    if (!(_isValid(value))) {
        throw Error('Value should be a number');
    }

    var newValue = value.toString();
    return _replace(newValue);

    function _isValid() {
        if (typeof value !== 'string' && typeof value !== 'number') {
            return false;
        }

        var re = new RegExp('^\\d+(\\' + numberDotSymbol + '\\d+)?$');
        return re.test(value);
    }

    function _replace(value) {
        var asArray = value.split('');
        var count = (asArray.indexOf(numberDotSymbol) === -1)
            ? replace_count
            : replace_count + 1;
        var replaced = asArray.slice(0, count).reduce(function(acc, cur) {
            acc += replaceSymbol;
            return acc;
        }, '');

        return replaced + value.slice(count);
    }
}

exports.replace = replace;
