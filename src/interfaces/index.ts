export interface person { username: string, id: string, channelId: string }
export interface convMsg { role: "system" | "user" | "assistant", content: string }
export interface gifs {
  expressionOrFeeling: string,
  url: string
}