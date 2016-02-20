'use strict';


var config = {
    baseUrl: 'http://localhost:9000',
    specs: ['../../**/*.scenario.js'],
    keepAlive: true,
    capabilities:{
        browserName: 'chrome'
    }
};

exports.config = config;
