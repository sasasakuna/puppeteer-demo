const _ = require('lodash');

describe('finish todo', function () {
    this.timeout(0);

    let page;

    before (async function () {

        page = await browser.newPage();
        await page.goto('http://todomvc.com/examples/react/#/');

    });


    it('finish one todo', async function () {

        await page.waitForSelector('.new-todo');
        await page.type('.new-todo', 'todo2');
        await page.keyboard.press('Enter');

        await page.waitFor(2000);

        let checkbox = (await page.$x('//section/ul/li/div[label/text()=\'todo2\']/input'))[0];
        await checkbox.click();
        await page.click('footer ul.filters a[href="#/active"]');
        await page.screenshot({path: './screenshot/example.png'});
        const haha = await page.$$eval('section ul.todo-list li label', function(results){
            return results.map(function (result) {
                return result.innerText;
            })
        });
        expect(haha).not.to.include('todo2');

    });

    after (async function () {
        await page.close();
    });
});