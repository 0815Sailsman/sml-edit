import {BigCondition} from "./bigCondition";

export interface OtherObject {
  name: string
  if?: BigCondition
}

export function otherObjectToString(object: OtherObject | undefined): string {
  if (object == undefined) {
    return "undefined"
  }
  return object.name
}
