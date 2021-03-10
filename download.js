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

        //stores download links of different video resolutions
        let list = await page.$$eval('div.mirror_link:nth-child(5) > div', arr => arr.map(ele => ele.firstChild.href));

        return list;

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

//returns download link of the specified video resolution
function getVideoRes(links, res) {
    let download_link = links.filter(link => link.includes(res))[0];
    return download_link;
}

(async () => {
    let links = await download("https://www2.gogoanime.sh/diamond-ace-episode-1")
    console.log(getVideoRes(links, '360'));
})();