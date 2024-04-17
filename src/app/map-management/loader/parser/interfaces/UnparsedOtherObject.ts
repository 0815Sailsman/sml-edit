import {UnparsedBigCondition} from "./UnparsedBigCondition";

export interface UnparsedOtherObject {
  id: number
  name: string
  availableIf?: UnparsedBigCondition
}
