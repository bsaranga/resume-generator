const path = require('path');
const puppeteer = require('puppeteer');

const markup = `file://${path.join(__dirname, 'index.html')}`
const output = path.join(__dirname, 'output.pdf');

async function generatePDF(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.pdf({ path: outputPath, format: 'A4' });
  await browser.close();
}

generatePDF(markup, output)
  .then(() => console.log('PDF generated successfully'))
  .catch(err => console.error('Error generating PDF:', err));
