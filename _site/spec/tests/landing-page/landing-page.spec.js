const testUtil = require('../../diff-util.js');
const axeUtils = require('../../axe-util.js');
const { AxePuppeteer } = require('axe-puppeteer');

describe('Test the Landing page works',() => {
    let broswer = null;
    let page = null;
    beforeAll(async ()=>{
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
    });
    afterEach(async () => {
        const bodyhandle = await page.$('body');
        await page.evaluate(element => {
            element.innerHTML = '';
        }, bodyhandle);
        await page.close();
        await browser.close();
    });
    afterAll(async () => { });
    it('Test the accessibility of landing page', async (done) =>{
        const Differencify = require('differencify');
        const differencify = new Differencify({});
        browser = testUtil.setTestName(
            differencify,
            'Test the accessibility of landing page'
        );
        page = await testUtil.createPage(browser);
        await page.goto('http://localhost:4000/',{waitUntil: 'networkidle0'});
        const results = await new AxePuppeteer(page).include('body').analyze();
        expect(axeUtils.isValid(results)).toBeTruthy();
        done();
    });
});