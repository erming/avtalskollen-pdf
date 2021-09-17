const { chromium } = require("playwright");
const PDFMerger = require("pdf-merger-js");
const fs = require("fs-extra");

// Global
let browser = null;
let merger = new PDFMerger();

async function init() {
  if (!browser) {
    browser = await chromium.launch();
  }
}

async function generate(name) {
  if (!name) {
    throw Error();
  }
  const page = await browser.newPage();
  await page.setContent(`
  <style>
  body {
    font: 15px sans-serif;
    margin: 0;
  }
  .temp {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    min-height: 320px;
  }
  </style>
  <div class="temp">
    Hello, world.
  </div>
  `);
  let pdf = await page.pdf({
    format: "A4"
  });
  await Promise.all([
    fs.writeFile(name, pdf),
    page.close()
  ]);
  return pdf;
}

async function merge(a, b, name) {
  if (!name) throw Error();
  merger.add(a);
  merger.add(b);
  await merger.save(name);
}

function close() {
  return browser.close();
}

module.exports = {
  init,
  generate,
  merge,
  close,
};
