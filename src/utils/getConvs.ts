import * as fs from 'fs'
import { readJson } from '.'

export default function getConvs(path: string) {
  try {
    return readJson(path)
  } catch (e) {
    return {}
  }
}