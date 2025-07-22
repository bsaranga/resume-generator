import OpenAI from "openai";
import { writeFileSync, appendFileSync } from "fs";

const client = new OpenAI({
    baseURL: "http://localhost:11434/v1",
    apiKey: "ollama"
});

const stream = await client.chat.completions.stream({
  model: 'gemma3',
  messages: [
    { role: 'system', content: 'You only respond in JSON' },
    { role: 'user', content: 'In one sentence say why is the sky blue?' }
  ],
  stream: true
});

writeFileSync("output.txt", "");

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0].delta.content);
  // Write chunks to a file
  appendFileSync("output.txt", chunk.choices[0].delta.content);
}

console.log("\nDone!");