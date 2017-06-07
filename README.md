# number-masker

A simple module for masking numeric values.

[![Build Status](https://travis-ci.org/dlukanin/number-replacer.svg?branch=master)](https://travis-ci.org/dlukanin/number-replacer)

## Usage
Pass the value you want to replace symbols in to the `replace` function. The function takes two arguments: a value itself and an option hash.
The options are:
* replaceCount -- amount of digits to replace. Defaults to 3.
* replaceSymbol -- symbol to replace digits with. Defaults to '*'.
* numberDotSymbol -- symbol used to divide integer and fraction digits. Defaults to '.'.

## Examples
```
const replace = require('number-masker).replace;

replace(123456) === '***456'; // true
replace(12345e-3) === '****45'; // true
replace(123.456) === '****56'; //true
replace('123,456', {
    replaceCount: 4,
    replaceSymbol: '?',
    numberDotSymbol: ','
}) === '?????56'; // true
```

## License (MIT)
https://github.com/dlukanin/number-masker/blob/master/LICENSE
