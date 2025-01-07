import ollama from 'ollama';

async function main() {
  
  const output = await ollama.generate({ model: "llama3.2:1b", prompt: "why is the sky blue?", stream: true })
  const context = [];
  
  for await (const part of output) {
    if (part.done === true) {
      console.log(`first generate complete`);
      context.push(...part.context);
    }
  }
  
  const output2 = await ollama.generate({ model: "llama3.2:1b", prompt: "can it be another?", context: context, stream: true });
  // console.log(`output with context\n\n${output2.response}\n\noutput complete\n`);
  for await (const part of output2) {
    if (part.done === true) {
      console.log(`second generate complete`);
      context.push(...part.context);
    }
  }
  
  // console.log(context)
  
  const output3 = await ollama.generate({ model: "llama3.2:1b", prompt: "what questions did i ask you ?" , context: context });
  console.log(`output without context\n\n${output3.response}\n\noutput complete`);
}

main()