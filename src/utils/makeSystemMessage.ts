import { readJson } from "."
import { type gifs } from "../interfaces"

export default function makeSystemMessage(gif_path: string) {
  const gifs: gifs[] = readJson(gif_path)
  const gifsStr = `Here is a list of gif urls associated with the feeling or the situation they can represent, you can give the url of the gif in your response, the url will be sent after your messageToSendBack, the following gif urls are the only one you are allowed to return, only use gifs if needed. Here are the gifs: \n\n${gifs.map(g => `${g.expressionOrFeeling}: ${g.url}`).join('\n')}\n`

  return `The user will give you a message send by a friend, it is most likely in french, mimic a response from me, the response will be sent on discord, you can use the discord markdown if needed, dont use @users. The response must be a non-empty string.\n\n${gifsStr}`
}