'use strict';

var minimist = require('minimist');
var argv = minimist(process.argv.slice(2));
var getConfig = require('@tridnguyen/config');

var opts = Object.assign({}, getConfig({
    coverage: 'smoke',
    timeout: 999999,
    locale: 'x_default',
    user: 'testuser1',
    name: 'UIFunctionalTests'
}, './config.json'), argv);

var specs = 'test/functional/'

var sauce = {};

if (opts.sauce) {
    if (!process.env.SAUCE_USER && !process.env.SAUCE_ACCESS_KEY) {
        throw new Error('Sauce Labs user and access key are required');
    }
    sauce.host = 'ondemand.saucelabs.com';
    sauce.port = 80;
    sauce.user = process.env.SAUCE_USER;
    sauce.key = process.env.SAUCE_ACCESS_KEY;
    if (opts.client === 'chrome') {
        sauce.capabilities = [
            {
                browserName: 'chrome',
                platform: 'OS X 10.10',
                version: '45.0',
                name: opts.name + 'OnChrome'
            }
        ];
    } else if (opts.client === 'appium') {
        sauce.capabilities = [
            {
                browserName: 'safari',
                appiumVersion: '1.6.3',
                deviceName: 'iPad Retina Simulator',
                orientation: 'PORTRAIT',
                platformVersion: '10.0',
                platformName: 'iOS',
                app: '',
                name: opts.name + 'OnIPadRetina',
                autoAcceptAlerts: true
            }
        ];
    } else {
        sauce.capabilities = [
            {
                browserName: 'chrome',
                platform: 'OS X 10.10',
                version: '45.0',
                name: opts.name + 'OnChrome'
            },
            {
                browserName: 'safari',
                appiumVersion: '1.6.3',
                deviceName: 'iPad Retina Simulator',
                orientation: 'PORTRAIT',
                platformVersion: '10.0',
                platformName: 'iOS',
                app: '',
                name: opts.name + 'OnIPadRetina',
                autoAcceptAlerts: true
            }
        ];
    }
}

exports.config = Object.assign({
    framework: 'mocha',
    services: ['sauce'],
    mochaOpts: {
        ui: 'bdd',
        timeout: opts.timeout,
        compilers: ['js:babel-core/register']
    },
    maxInstances: 1,
    coloredLogs: true,
    deprecationWarnings: false,
    bail: 0,
    screenshotPath: './errorShots/',
    logLevel: 'silent',
    specs: [
        specs
    ],
    suites: {
        sanity: [
            './test/functional/cart/assessment.js'
        ],
        regression: [
            // ...
        ]
    },
    capabilities: [{
        browserName: 'chrome'
    }],
    // client: 'chrome',
    baseUrl: 'https://storefront:movado123@dev13-na-movadogroup.demandware.net',
    //If url is not changing, then its fine
    waitforTimeout: opts.timeout,
    reporters: ['spec', 'allure'],
    reporterOptions: {
        allure: {
            outputDir: './reports/allure-results/',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: false
        }
    },
    locale: opts.locale,
    coverage: opts.coverage,
    user: opts.user,
    userEmail: opts.userEmail || opts.user + '@demandware.com'
}, sauce);