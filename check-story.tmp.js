const puppeteer = require('puppeteer');
async function probe(page, url) {
  await page.goto(url, {waitUntil: 'networkidle0'});
  await new Promise(r => setTimeout(r, 800));
  await page.evaluate(() => Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Open Drawer'))?.click());
  await new Promise(r => setTimeout(r, 700));
  return await page.evaluate(() => ({
    dismissBtn: !!document.querySelector('[data-testid="dismissButton"]'),
    primaryBtn: !!Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Primary'),
    secondaryBtn: !!Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Secondary'),
    hasForm: !!document.querySelector('form'),
  }));
}
(async () => {
  const browser = await puppeteer.launch({headless: 'new', args: ['--no-sandbox']});
  const page = await browser.newPage();
  const base = "http://localhost:6006/iframe.html?id=components-modals-drawer--default&viewMode=story";
  const variants = [
    ["no args", base],
    ["showButton:false", `${base}&args=showButton:false`],
    ["showSecondaryButton:false", `${base}&args=showSecondaryButton:false`],
    ["onDismissHandler:false", `${base}&args=onDismissHandler:false`],
    ["form:true", `${base}&args=form:true`],
  ];
  for (const [label, url] of variants) {
    console.log(label, '=>', JSON.stringify(await probe(page, url)));
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
