import {AtomicConditionInterface} from "./atomicCondition.interface";

export interface BigConditionInterface {
  grammar: string
  subConditions: AtomicConditionInterface[]
}
