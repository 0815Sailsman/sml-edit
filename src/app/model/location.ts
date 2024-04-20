import {Item} from "./item";
import {Enemy} from "./enemy";
import {OtherObject} from "./otherObject";
import {NPC} from "./NPC";
import {Connection} from "./connection";

export class Location {
  id: number;
  name: string;
  connections: Connection[];
  items: Item[];
  enemies: Enemy[];
  objects: OtherObject[];
  npcs: NPC[];

  constructor(
    id: number,
    name: string,
    connections?: Connection[],
    items? : Item[],
    enemies? : Enemy[],
    objects? : OtherObject[],
    npcs?: NPC[]
  ) {
    this.id = id;
    this.name = name;
    this.connections = connections ?? [];
    this.items = items ?? [];
    this.enemies = enemies ?? [];
    this.objects = objects ?? [];
    this.npcs = npcs ?? [];
  }

  toString(): string {
    return this.name + " (ID: " + this.id + ")";
  }
}
