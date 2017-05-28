/**
 * Constructs new Replacer instance.
 * @param {number} [numbersToReplaceCount=3]
 * @param {string} [replaceSymbol=*]
 * @constructor
 */
function Replacer(numbersToReplaceCount, replaceSymbol) {
    /**
     * @type {number}
     */
    this.numbersToReplaceCount = numbersToReplaceCount || Replacer.DEFAULT_NUMBER_COUNT;
    /**
     * @type {string}
     */
    this.replaceSymbol = replaceSymbol || Replacer.DEFAULT_REPLACE_SYMBOL;
}

Replacer.DEFAULT_NUMBER_COUNT = 3;
Replacer.DEFAULT_REPLACE_SYMBOL = '*';
Replacer.NUMBER_DOT_SYMBOL = '.';

Replacer.prototype._checkNumericArgs = function(number, numbersToReplaceCount, replaceSymbol) {
    var invalidFields = [];
    if (typeof number !== 'number' || !isFinite(number)) {
        invalidFields.push(number);
    }

    if (typeof numbersToReplaceCount !== 'number' || numbersToReplaceCount <= 0 || !isFinite(numbersToReplaceCount)) {
        invalidFields.push(numbersToReplaceCount);
    }

    if (typeof replaceSymbol !== 'string' || !replaceSymbol.length) {
        invalidFields.push(replaceSymbol);
    }

    if (invalidFields.length) {
        throw new Error('Invalid args: ', invalidFields);
    }
};

/**
 * Performs replace operation.
 * @param number
 * @param {number} [numbersToReplaceCount]
 * @param {string} [replaceSymbol]
 * @return {string}
 */
Replacer.prototype.replace = function(number, numbersToReplaceCount, replaceSymbol) {
    numbersToReplaceCount = numbersToReplaceCount || this.numbersToReplaceCount;
    replaceSymbol = replaceSymbol || this.replaceSymbol;

    this._checkNumericArgs(number, numbersToReplaceCount, replaceSymbol);

    var numberAsString = number.toString();
    var len = numberAsString.length;

    var processedString = '';
    var replacedSymbolsCount = 0;

    for (var i = 0; i < len; i++) {
        processedString += replaceSymbol;

        if (numberAsString[i] === Replacer.NUMBER_DOT_SYMBOL) {
            continue;
        }

        if (++replacedSymbolsCount >= numbersToReplaceCount) {
            break;
        }

    }

    return processedString + numberAsString.slice(-(numberAsString.length - processedString.length));
};

exports.Replacer = Replacer;