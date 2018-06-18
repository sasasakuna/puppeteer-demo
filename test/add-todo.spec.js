const _ = require('lodash');

describe('add todo', function () {
    this.timeout(0);

    let page;

    before (async function () {

        page = await browser.newPage();
        await page.goto('http://todomvc.com/examples/react/#/');

    });


    it('add one todo', async function () {

        await page.waitForSelector('.new-todo');
        await page.type('.new-todo', 'todo1');
        await page.keyboard.press('Enter');

        await page.waitFor(2000);

        const haha = await page.$$eval('section ul.todo-list li label', function(results){
            return results.map(function (result) {
                return result.innerText;
            })
        });
        expect(haha).to.include('todo1');

    });

    it('finish todo', async function () {
        let checkbox = (await page.$x('//section/ul/li/div[label/text()=\'todo1\']/input'))[0];
        await checkbox.click();
        await page.click('footer ul.filters a[href="#/active"]');
        await page.screenshot({path: './screenshot/example.png'});
        const haha = await page.$$eval('section ul.todo-list li label', function(results){
            return results.map(function (result) {
                return result.innerText;
            })
        });
        expect(haha).not.to.include('todo1');
    });

    after (async function () {
        await page.close();
    });
});