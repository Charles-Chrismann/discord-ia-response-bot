import * as fs from 'fs'

export default function readJson(path: string) {
  return JSON.parse(fs.readFileSync(path).toString())
}