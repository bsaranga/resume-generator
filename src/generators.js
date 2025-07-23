import puppeteer from 'puppeteer';

async function generatePDF(url, outputPath) {
  const browser = await puppeteer.launch({
    args: [
      '--disable-web-security', // Disables CORS and other web security features
      '--user-data-dir=/tmp/puppeteer_temp', // Required to avoid profile conflicts
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ],
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForFunction(() => {
    const imgs = Array.from(document.images);
    return imgs.length === 0 || imgs.every(img => img.complete);
  });
  await page.pdf({ path: outputPath, format: 'A4', printBackground: true, scale: 1.22 });
  await browser.close();
}

export { generatePDF };