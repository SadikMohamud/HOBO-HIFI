const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Get body HTML
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  console.log('--- BODY HTML CONTENT ---');
  console.log(bodyHTML);
  console.log('-------------------------');

  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
