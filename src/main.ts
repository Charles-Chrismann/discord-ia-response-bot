import 'dotenv/config'
import { Client } from "discord.js-selfbot-v13";
import ollama, { ChatResponse } from 'ollama';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { checkValidity, getConvs, makeSystemMessage, readJson, saveConvs } from './utils';
import { convMsg, person } from './interfaces';

const CONVS_PATH = process.env.CONVS_PATH as string
const PERSONS_PATH = process.env.PERSONS_PATH as string
const GIFS_PATH = process.env.GIFS_PATH as string

const format = z.object({
  messageToSendBack: z.string(),
  gifUrlToSendAfterMessage: z.nullable(z.string())
})

const model = process.env.MODEL as string
const persons: person[] = readJson(PERSONS_PATH)
const client = new Client();
let convs: {[index:string]: convMsg[] } = getConvs(CONVS_PATH)
const convMap = new Map<string, string>()

console.log(makeSystemMessage(GIFS_PATH))

client.once('ready', async () => {
  console.log(`${client.user!.username} is ready!`);
});

client.on("messageCreate", async message => {
  if(!checkValidity(message, persons)) return

  console.log(`Message from ${persons.find(p => p.id === message.author.id)?.username}: ${message.content}`)

  const prompt = message.content
  const userId = message.author.id
  if(!convs[userId]) convs[userId] = [
    {
      role: "system",
      content: makeSystemMessage(GIFS_PATH)
    }
  ]

  const userConv = convs[userId]
  const interactionId = crypto.randomUUID()
  if(convMap.has(userId) && userConv.at(-1) && userConv.at(-1)!.role === "user") userConv.at(-1)!.content += `\n\n${prompt}`
  else {
    message.channel.sendTyping()
    userConv.push({ role: "user", content: prompt })
  }

  convMap.set(userId, interactionId)

  const output = await ollama.chat({ model, messages: [...userConv], format: zodToJsonSchema(format) })
  if(convMap.get(userId) !== interactionId) return
  convMap.delete(userId)
  let data: {messageToSendBack: string, gifUrlToSendAfterMessage: string} = JSON.parse(output.message.content)
  userConv.push(output.message as convMsg)
  
  saveConvs(CONVS_PATH, convs)
  await message.channel.send(data!.messageToSendBack)
  if(
    data!.gifUrlToSendAfterMessage &&
    data!.gifUrlToSendAfterMessage !== ""
  ) await message.channel.send(data!.gifUrlToSendAfterMessage)
});

client.login(process.env.TOKEN);