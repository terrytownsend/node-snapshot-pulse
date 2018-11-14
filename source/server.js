import express from 'express';
import puppeteer from 'puppeteer';
import regeneratorRuntime from 'regenerator-runtime';

const port = 3000;
const server = express();

server.get('/', async (req, res) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });
  await page.goto('https://www.ivanti.com/resources/patch-tuesday', {waitUntil: 'domcontentloaded'});
  await page.waitForSelector('.items.recorded-list.row');
  const element = await page.$('.items.recorded-list.row > .item .details');
  const png = await element.screenshot({ encoding: 'base64' });
  browser.close();

  res.send(`<img src="data:image/png;base64, ${png}"></img>`);
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`);
