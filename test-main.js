var allTestFiles = [];
Object.keys(window.__karma__.files).forEach(function (file) {
    if (file.indexOf('main') !== -1) {
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(normalizedTestModule)
    }
});

require.config({
    baseUrl: '/base',
    paths: {
    },
    deps: allTestFiles,
    callback: window.__karma__.start
});
