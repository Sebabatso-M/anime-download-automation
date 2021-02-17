const puppeteer = require('puppeteer');
const {
    writeFileSync
} = require('fs');

async function getLinks(site) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {

        await page.goto(site);

        //retrieve episode links
        let hrefs = await page.$$eval('#episode_related li', items => items.map(item => item.firstElementChild.href));

        writeToFile(`${getAnimeName(site)}_to_download.json`, hrefs)

    } catch (er) {
        console.error(er);

    } finally {
        setTimeout(async () => {
            await browser.close();
        }, 3000);
    }

};

function writeToFile(fileName, links) {
    let dataString = JSON.stringify(links, null, 2);

    writeFileSync(fileName, dataString);

}

function getAnimeName(link) {
    let arr = link.split('/')
    return arr[arr.length - 1]
}

getLinks('https://www2.gogoanime.sh/category/jojo-no-kimyou-na-bouken-stardust-crusaders---egypt-hen');
