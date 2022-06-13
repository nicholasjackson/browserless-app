const express = require('express');
const puppeteer = require('puppeteer-core');

const app = express();

app.get('/image', async (req, res) => {

    var width = parseInt(req.query.width) || 1920;
    var height = parseInt(req.query.height) || 1080;
    const url = req.query.url;
    const waitText = req.query.wait_for || "";
   
    try {

      console.log("Fetching URL:" + url + " height:" + height + " width:" + width + " wait_for:" + waitText);
 
      // This was puppeteer.launch()
      const browser = await puppeteer.connect({ browserWSEndpoint: process.env.BROWSERLESS }).catch(error => { throw error});
      
      console.log("connected");

      const page = await browser.newPage().catch(error => { throw error});
      await page.setViewport({
        width: width,
        height: height,
        deviceScaleFactor: 1,
      }).catch(error => { throw error});


      await page.goto(url).catch(error => { throw error});

      if (waitText != "") {
        await page.waitForFunction(
          'document.querySelector("body").innerText.includes("' + waitText + '")'
        );
      }

      const data = await page.screenshot().catch(error => { throw error});
      browser.close();

      console.log("done");

      return res.end(data, 'binary');

    } catch (err) {

      console.log(err);
      res.status(500).send(err);

    }
});

app.listen(8080);
