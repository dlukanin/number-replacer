# number-replacer

# Usage
Pass the value you want to replace symbols in to the `replacer` function. The function takes two arguments: a value itself and an option hash.
The options are:
* replaceCount -- amount of digits to replace. Defaults to 3.
* replaceSymbol -- symbol to replace digits with. Defaults to '*'.
* numberDotSymbol -- symbol used to divide integer and fraction digits. Defaults to '.'.

# Examples
```
replace(123456) === '***456';
replace(12345e-3) === '****45';
replace(123.456) === '****56';
replace('123,456', {
    replaceCount: 4,
    replaceSymbol: '?',
    numberDotSymbol: ','
}) === '?????56';
```
