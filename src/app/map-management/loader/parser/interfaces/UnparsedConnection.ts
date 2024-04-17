import {UnparsedBigCondition} from "./UnparsedBigCondition";

export interface UnparsedConnection {
  id: number
  to: number
  availableIf?: UnparsedBigCondition
}
