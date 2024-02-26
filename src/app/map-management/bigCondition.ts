import {AtomicCondition} from "./atomicCondition";

export interface BigCondition {
  grammar: string
  subConditions: AtomicCondition[]
}
