import {BigCondition} from "../model/bigCondition";
import {Drop} from "./drop";
import {MapManagerService} from "./map-manager.service";

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

  toString(mapService: MapManagerService): string {
    return this.name + " (ID: " + this.id + ") spawning in " + (mapService.locationOfEnemyWithID(this.id)?.name ?? "undefined location");
  }
}
