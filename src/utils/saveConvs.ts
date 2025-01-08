import * as fs from 'fs'
import { convMsg } from '../interfaces'

export default function saveConvs(path: string, convs: {[index:string]: convMsg[] }) {
  fs.writeFileSync(path, JSON.stringify(convs, null, 2))
}