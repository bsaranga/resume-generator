import OpenAI from "openai";
import process from "process";
import { writeFileSync, appendFileSync, readFileSync } from "fs";
import { __dirname } from "../utils.js";

const prompt_template = readFileSync(`${__dirname}/agents/prompts/cv_gen.prompt`, "utf8");

export async function generateResume(contextPath = null, jobDescriptionPath = null) {
  
  if (!contextPath) {
    contextPath = `${__dirname}/data/context.json`;
  }

  if (!jobDescriptionPath) {
    jobDescriptionPath = `${__dirname}/data/job_description.md`;
  }

  const context = readFileSync(contextPath, "utf8");
  const job_description = readFileSync(jobDescriptionPath, "utf8");

  let prompt = prompt_template.replace("%APPLICANT_CONTEXT%", context);
  prompt = prompt.replace("%JOB_DESCRIPTION%", job_description);

  console.log("Generating resume...");

  const client = new OpenAI();

  const stream = await client.chat.completions.stream({
    model: 'gpt-4.1',
    messages: [
      { role: 'system', content: "You're a resume generator that writes an optimized resume for a given job description and candidate context. You use a flavor of markdown and jsx, also known as MDX." },
      { role: 'user', content: prompt }
    ],
    stream: true
  });

  const outputFile = `${__dirname}/src/resume.mdx`;
  writeFileSync(outputFile, "");

  for await (const chunk of stream) {
    if (chunk.choices[0].delta.content != undefined) {
      process.stdout.write(chunk.choices[0].delta.content);
      appendFileSync(outputFile, chunk.choices[0].delta.content);
    }
  }
}