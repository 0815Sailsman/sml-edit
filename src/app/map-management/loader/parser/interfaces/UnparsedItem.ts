import {UnparsedBigCondition} from "./UnparsedBigCondition";

export interface UnparsedItem {
  id: number
  itemTypeID: number
  count: number
  availableIf?: UnparsedBigCondition
}
