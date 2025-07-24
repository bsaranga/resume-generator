
# Resume Generator

This is a resume generator application that allows you to generate a professional resume using customizable templates and data sources.

## Features

- Generate resumes in PDF and HTML formats
- Customize resume content using JSON and Markdown files
- Modular components for easy editing and extension
- Built with React (JSX), Rollup, and Node.js

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- OPENAI_API_KEY should be set in environment variables

### Direct Installation (Have bugs, use the other installation route)
Run `npm install resumeagen`

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bsaranga/resume-generator.git
   cd resume-generator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Usage

#### 1. Edit Resume Data

- Update the files in the `data/` directory (e.g., `header.json`, `context.json`, `job_description.md`) to customize your resume content.
- You can also modify templates in `src/` and `src/components/` for layout and style changes.


#### 2. Generate a Resume (CLI Usage)

To generate a resume using the command-line interface, use:

```bash
node resumeagen.js generate <contextPath> <jobDescriptionPath>
```

- `<contextPath>`: Path to your context file (e.g., `data/context.json`)
- `<jobDescriptionPath>`: Path to your job description file (e.g., `data/job_description.md`)

This will generate a new resume and output a PDF (`resume.pdf`) in your current directory.

#### 3. Regenerate PDF Only (CLI Usage)

If you have already generated your resume and want to tweak or regenerate the PDF (for example, after editing `resume.mdx` or making layout changes), use:

```bash
node ./resumeagen.js regen-pdf
```

You can also specify a custom scale factor for the PDF:

```bash
node ./resumeagen.js regen-pdf --scale 1.5
```

This will regenerate `resume.pdf` from the current HTML output.

#### 3. Development Workflow

During development, you may want to build or preview the resume manually:

- To build the resume (HTML, PDF, etc.):

  ```bash
  npm run build
  ```

- To start bundle watch:

  ```bash
  npm start
  ```

- Open `src/index.html` in your browser to preview the resume.

#### 4. Customization

- Modify `src/index.jsx` and components in `src/components/` to change the look and feel.
- Update or add prompts in `src/agents/prompts/` for AI-driven resume rewriting.

- For custom scripts, check the `package.json` scripts section.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Contact

For questions or support, please contact the repository owner.
