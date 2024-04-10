import {BigCondition} from "./bigCondition";

export class OtherObject {
  id: number
  name: string
  availableIf?: BigCondition

  constructor(
    id: number,
    name: string,
    availableIf?: BigCondition
  ) {
    this.id = id;
    this.name = name;
    this.availableIf = availableIf;
  }

  toString(): string {
    return this.name;
  }
}
