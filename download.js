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

        await page.$$eval('div.mirror_link:nth-child(5) > .dowloads', arr => arr.map(i => i.firstChild.href));


    } catch (er) {
        console.log(er);
    } finally {
        setTimeout(() => {
            browser.close();
        }, 3000);

    }
}

download("https://www2.gogoanime.sh/diamond-ace-episode-1");
