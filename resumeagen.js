#!/usr/bin/env node
import process from 'process';
import { execSync } from 'child_process';
import { __dirname } from './src/utils.js';
import { generateResume } from './src/agents/resume_rewriter.js';
import { generatePDF } from './src/generators.js';

import chalk from 'chalk';
import { program  } from 'commander';
import { input } from '@inquirer/prompts';

const ascii_art = `
██████╗ ███████╗███████╗██╗   ██╗███╗   ███╗███████╗ █████╗  ██████╗ ███████╗███╗   ██╗
██╔══██╗██╔════╝██╔════╝██║   ██║████╗ ████║██╔════╝██╔══██╗██╔════╝ ██╔════╝████╗  ██║
██████╔╝█████╗  ███████╗██║   ██║██╔████╔██║█████╗  ███████║██║  ███╗█████╗  ██╔██╗ ██║
██╔══██╗██╔══╝  ╚════██║██║   ██║██║╚██╔╝██║██╔══╝  ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║
██║  ██║███████╗███████║╚██████╔╝██║ ╚═╝ ██║███████╗██║  ██║╚██████╔╝███████╗██║ ╚████║
╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝
                                                                                       
`

program
  .name('resumeagen')
  .description('AI powered resume generator tailored to job descriptions')
  .version('1.0.0')
  .addHelpText('before', chalk.greenBright(ascii_art));

program
  .command('generate')
  .description('Generate a resume based on the provided context and job description')
  .argument('<contextPath>', 'Path to the context file (e.g., resume.json)')
  .argument('<jobDescriptionPath>', 'Path to the job description file (e.g., job_description.json)')
  .action(async (contextPath, jobDescriptionPath) => {
      try {
        generateResume(contextPath, jobDescriptionPath).then(() => {

          try {
            execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
          } catch (err) {
            console.error('Error running npm build:', err);
            process.exit(1);
          }

          const markup = `file://${__dirname}/index.html`
          const output = `${process.cwd()}/resume.pdf`;

          generatePDF(markup, output)
            .then(() => console.log(chalk.greenBright(`PDF generated successfully: ${output}`)))
            .catch(err => console.error('Error generating PDF:', err));
            //process.env.NODE_ENV = 'development'; // enable during development
        }).catch(err => {
          console.error('Error generating resume:', err);
          process.exit(1);
        });
      } catch (err) {
        console.error('Error generating resume:', err);
        process.exit(1);
      }
    }
  );

program
  .command('regen-pdf')
  .description('Regenerate the PDF from the existing resume.mdx file. Use this for personal tweaks.')
  .option('-s, --scale <FLOAT>', 'Scale factor for the PDF', '1.332')
  .action(async (options) => {
    const doc_scale = parseFloat(options.scale);
    const markup = `file://${__dirname}/index.html`
    const output = `${process.cwd()}/resume.pdf`;
    try {
      await generatePDF(markup, output, doc_scale);
      console.log(chalk.greenBright(`PDF regenerated successfully: ${output}`));
    } catch (err) {
      console.error('Error regenerating PDF:', err);
      process.exit(1);
    }
  })

program.parse();
