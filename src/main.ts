import 'dotenv/config'
import * as fs from 'fs'
import { Client, type Message } from "discord.js-selfbot-v13";
import ollama, { ChatResponse } from 'ollama';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

interface person { username: string, id: string, channelId: string }
interface convMsg { role: "system" | "user" | "assistant", content: string }

function checkValidity(message: Message) {
  const person = persons.find(p => p.id === message.author.id)
  if(!person) return false
  return person.channelId === message.channelId
}

function saveConvs() {
  fs.writeFileSync(process.env.CONVS_PATH as string, JSON.stringify(convs))
}

function getConvs() {
  try {
    return JSON.parse(fs.readFileSync('./generated/convs.json').toString())
  } catch (e) {
    return {}
  }
}

const format = z.object({
  messageToSendBack: z.string()
})

const persons: person[] = JSON.parse(fs.readFileSync('./persons.json').toString())
const client = new Client();
let convs: {[index:string]: convMsg[] } = getConvs()

client.once('ready', async () => {
  console.log(`${client.user!.username} is ready!`);
});

client.on("messageCreate", async message => {
  if(!checkValidity(message)) return

  convs = getConvs()

  const prompt = message.content
  const userId = message.author.id
  if(!convs[userId]) convs[userId] = [
    {
      role: "system",
      content: `The user will give you a message send by a friend, it is most likely in french, mimic a response from me.`
    }
  ]

  const userConv = convs[userId]
  userConv.push({ role: "user", content: prompt })
  let data: {messageToSendBack: string} | undefined = undefined

  let output: ChatResponse | undefined = undefined
  output = await ollama.chat({ model: "llama3.2:1b", messages: userConv, format: zodToJsonSchema(format) })
  data = JSON.parse(output.message.content)
  userConv.push(output.message as convMsg)
  
  await message.reply(data!.messageToSendBack)
  saveConvs()
});

client.login(process.env.TOKEN);