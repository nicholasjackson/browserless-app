const express = require('express');
const puppeteer = require('puppeteer-core');
const mcache = require('memory-cache');

const app = express();

app.get('/image', async (req, res) => {

  const width = parseInt(req.query.width) || 1920;
  const height = parseInt(req.query.height) || 1080;
  const url = req.query.url;
  const waitText = req.query.wait_for || "";
  const waitSelector = req.query.wait_selector || "";
  const waitDuration = parseInt(req.query.wait_time) || 500;
  const cache = req.query.cache || 5;
  const browserless_uri = process.env.BROWSERLESS || "ws://localhost:3000"; 
 
  try {
    console.log(
      "Fetching URL: " + url + 
      " height: " + height + 
      " width: " + width + 
      " wait_for: " + waitText + 
      " cache: " + cache +
      " wait_duration: " + waitDuration +
      " wait_selector: " + waitSelector);

    let key = '__express__' + req.originalUrl || req.url

    if(cache > 0) {
      let cachedBody = mcache.get(key)
      if (cachedBody) {
        console.log("Returned cached data:" + url);
        return res.end(cachedBody, 'binary');
      }
    }

    const browser = await puppeteer.connect({ browserWSEndpoint: browserless_uri }).catch(error => { throw error});
  
    console.log("Connected to browserless");

    const page = await browser.newPage().catch(error => { throw error});

    await page.setViewport({
      width: width,
      height: height,
      deviceScaleFactor: 1,
    }).catch(error => { throw error});

    await page.goto(url).catch(error => { throw error});

    // if we are waiting for text to be displayed
    if (waitText != "") {
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("' + waitText + '")'
      );
    }
    
    // if we are waiting for a selector to be visible
    if (waitSelector != "") {
      await page.waitForSelector(waitSelector, { visible: true });
    }
   
    // wait for the specified duration or 500ms, single page apps will not be
    // available on the initial dom loaded event
    await page.waitFor(waitDuration);

    //await page.waitForNavigation({ waitUntil: 'load' });
    // by default wait until the network is idle
    //await page.waitForNavigation({
    //  waitUntil: 'networkidle2'
    //});

    const data = await page.screenshot().catch(error => { throw error});
    browser.close();

    console.log("Finished processing URL:" + url);

    if(cache > 0) {
      mcache.put(key, data, cache * 1000);
    }

    return res.end(data, 'binary');

  } catch (err) {

    console.log(err);
    res.status(500).send(err);

  }

});

app.listen(8080);
