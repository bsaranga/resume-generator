import OpenAI from "openai";
const client = new OpenAI({
    baseURL: "http://localhost:11434/v1",
    apiKey: "ollama"
});

const completion = await client.chat.completions.create({
  model: 'gemma3',
  messages: [{ role: 'user', content: 'In one sentence say why is the sky blue?' }],
})

console.log(completion.choices[0].message.content)