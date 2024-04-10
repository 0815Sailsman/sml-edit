import {BigCondition} from "./bigCondition";
import {Drop} from "./drop";

export class Enemy {
  id: number
  name: string
  souls: number
  respawns: boolean
  drops: Drop[]
  availableIf?: BigCondition

  constructor(
    id: number,
    name: string,
    souls: number,
    respawns: boolean,
    drops: Drop[],
    availableIf?: BigCondition
  ) {
    this.id = id;
    this.name = name;
    this.souls = souls;
    this.respawns = respawns;
    this.drops = drops;
    this.availableIf = availableIf;
  }

  toString(): string {
    return this.name;
  }
}
