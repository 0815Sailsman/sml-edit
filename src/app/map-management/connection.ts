import {BigCondition} from "./bigCondition";

export interface Connection {
  id: number
  to: number
  if?: BigCondition
}

export function connectionToString(connection: Connection | undefined): string {
  if (connection == undefined) {
    return "undefined"
  }
  return "to " + connection.to.toString()
}
