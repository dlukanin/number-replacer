var DEFAULT_COUNT = 3;
var DEFAULT_REPLACE_SYMBOL = '*';
var NUMBER_DOT_SYMBOL = '.';


function replace(number) {
    if (!(_isValid(number))) {
        throw Error('Value should be a number');
    }
    var newValue = number.toString();
    return _replace(newValue);
}

function _isValid(number) {
    var re = new RegExp('^\\d+(\\' + NUMBER_DOT_SYMBOL + '\\d+)?$');
    return re.test(number);
}

function _replace(value) {
    var asArray = value.split('');
    var count = (asArray.indexOf(NUMBER_DOT_SYMBOL) === -1)
        ? DEFAULT_COUNT
        : DEFAULT_COUNT + 1;
    var replaced = asArray.slice(0, count).reduce(function(acc, cur) {
        acc += DEFAULT_REPLACE_SYMBOL;
        return acc;
    }, '');

    return replaced + value.slice(count);
}

exports.replace = replace;
