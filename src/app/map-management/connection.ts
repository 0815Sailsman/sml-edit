import {BigCondition} from "./bigCondition";

export class Connection {

  id: number;
  to: number;
  availableIf?: BigCondition;

  constructor(
    id: number,
    to: number,
    availableIf?: BigCondition
  ) {
    this.id = id;
    this.to = to;
    this.availableIf = availableIf;
  }

  toString(): string {
    return "to " + this.to.toString();
  }
}
