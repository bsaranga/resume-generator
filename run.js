import process from 'process';
import puppeteer from 'puppeteer';

const markup = `file://${process.cwd()}/index.html`
const output = `${process.cwd()}/out/resume.pdf`;

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
  await page.waitForFunction(() => document.readyState === 'complete');
  await page.pdf({ path: outputPath, format: 'A4', printBackground: true, scale: 1.3 });
  await browser.close();
}

generatePDF(markup, output)
  .then(() => console.log('PDF generated successfully'))
  .catch(err => console.error('Error generating PDF:', err));

  process.env.NODE_ENV = 'development';
