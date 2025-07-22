import OpenAI from "openai";
import process from "process";
import { writeFileSync, appendFileSync, readFileSync } from "fs";

const current_resume = readFileSync(`${process.cwd()}/in/current_resume.md`, "utf8");
const job_description = readFileSync(`${process.cwd()}/in/job_description.md`, "utf8");

const client = new OpenAI({
    baseURL: "http://localhost:11434/v1",
    apiKey: "ollama"
});

const stream = await client.chat.completions.stream({
  model: 'gemma3',
  messages: [
    { role: 'system', content: "You're a resume generator that takes in an existing resume and a job description, and outputs a new resume that targets the job description using the info from the existing resume" },
    { role: 'user', content: `Here's the context you need, make sure to only output the modified resume. Don't write an intro. Don't write a summary. Context\n\nExisting resume: """\n${current_resume}\n"""\n\nJob Description: """\n${job_description}\n"""` }
  ],
  stream: true
});

writeFileSync("output.md", "");

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0].delta.content);
  // Write chunks to a file
  appendFileSync("output.md", chunk.choices[0].delta.content);
}

console.log("\nDone!");