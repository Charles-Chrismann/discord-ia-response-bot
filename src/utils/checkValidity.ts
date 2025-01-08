import { type Message } from "discord.js-selfbot-v13";
import { person } from "../interfaces"

export default function checkValidity(message: Message, persons: person[]) {
  const person = persons.find(p => p.id === message.author.id)
  if(!person) return false
  return person.channelId === message.channelId
}