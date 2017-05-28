var DEFAULT_REPLACE_COUNT = 3;
var DEFAULT_REPLACE_SYMBOL = '*';
var DEFAULT_NUMBER_DOT_SYMBOL = '.';


function replace(value, options) {
    var options = options || {};
    var replace_count = options.number_count || DEFAULT_REPLACE_COUNT;
    var replace_symbol = options.replace_symbol || DEFAULT_REPLACE_SYMBOL;
    var number_dot_symbol = options.number_dot_symbol || DEFAULT_NUMBER_DOT_SYMBOL;

    if (!(_isValid(value))) {
        throw Error('Value should be a number');
    }

    var newValue = value.toString();
    return _replace(newValue);

    function _isValid() {
        var re = new RegExp('^\\d+(\\' + number_dot_symbol + '\\d+)?$');
        return re.test(value);
    }

    function _replace(value) {
        var asArray = value.split('');
        var count = (asArray.indexOf(number_dot_symbol) === -1)
            ? replace_count
            : replace_count + 1;
        var replaced = asArray.slice(0, count).reduce(function(acc, cur) {
            acc += replace_symbol;
            return acc;
        }, '');

        return replaced + value.slice(count);
    }
}

exports.replace = replace;
