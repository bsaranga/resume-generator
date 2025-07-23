#!/usr/bin/env node
import path from 'path';
import process from 'process';
import puppeteer from 'puppeteer';
import { execSync } from 'child_process';
import { generateResume } from './agents/resume_rewriter.js';
import { __dirname } from './utils.js';

function parseArgs() {
  const args = process.argv.slice(2);
  let contextPath = null;
  let jobDescriptionPath = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--context' && args[i + 1]) {
      contextPath = path.resolve(args[i + 1]);
      i++;
    } else if (args[i] === '--job-description' && args[i + 1]) {
      jobDescriptionPath = path.resolve(args[i + 1]);
      i++;
    }
  }
  return [contextPath, jobDescriptionPath];
}

const [contextPath, jobDescriptionPath] = parseArgs();

console.log('Context Path:', contextPath);
console.log('Job Description Path:', jobDescriptionPath);

generateResume(contextPath, jobDescriptionPath).then(() => {

  try {
    execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
  } catch (err) {
    console.error('Error running npm build:', err);
    process.exit(1);
  }

  const markup = `file://${__dirname}/index.html`
  const output = `${process.cwd()}/resume.pdf`;

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

  generatePDF(markup, output)
    .then(() => console.log(`PDF generated successfully: ${output}`))
    .catch(err => console.error('Error generating PDF:', err));
    //process.env.NODE_ENV = 'development'; // enable during development
}).catch(err => {
  console.error('Error generating resume:', err);
  process.exit(1);
});
