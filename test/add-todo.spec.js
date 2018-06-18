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

    after (async function () {
        await page.close();
    });
});