import {BigCondition} from "./bigCondition";

export interface OtherObject {
  id: number
  name: string
  availableIf?: BigCondition
}

export function otherObjectToString(object: OtherObject | undefined): string {
  if (object == undefined) {
    return "undefined"
  }
  return object.name
}
