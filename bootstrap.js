const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'expect']);

// puppeteer options
const opts = {
    headless: false,
    timeout: 10000,
    slowMo: 250,
    devtools: true
};

// expose variables
before (async function () {
    global.expect = expect;
    global.browser = await puppeteer.launch(opts);
});

// close browser and reset global variables
after (async function () {
    browser.close();

    global.browser = globalVariables.browser;
    global.expect = globalVariables.expect;
});