const puppeteer = require('puppeteer');
const {
    readFileSync
} = require('fs');

async function download(site) {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    try {

        await page.goto(site);

        let link = await page.$eval('.dowloads a', ele => ele.href);

        await page.goto(link);



        let list = await page.$$eval('div.mirror_link:nth-child(5) > div', arr => arr.map(ele => ele.firstChild.href) );

        console.log('Download links:\n', list);

    } catch (er) {
        if (er instanceof puppeteer.errors.TimeoutError) {
            console.error('Network Error, please try again');
        } else {
            console.error(er);
        }
    } finally {
        setTimeout(() => {
            browser.close();
        }, 3000);

    }
}



download("https://www2.gogoanime.sh/diamond-ace-episode-1").then(arr => console.log(arr));