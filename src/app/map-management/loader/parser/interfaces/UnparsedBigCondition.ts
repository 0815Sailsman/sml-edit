import {UnparsedAtomicCondition} from "./UnparsedAtomicCondition";

export interface UnparsedBigCondition {
  grammar: string
  subConditions: UnparsedAtomicCondition[]
}
