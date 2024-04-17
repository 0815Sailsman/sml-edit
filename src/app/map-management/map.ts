import {Area} from "../model/area";
import {ItemType} from "../model/itemType";

export class Map {
  name: string
  areas: Area[]
  items: ItemType[]

  constructor(name: string, areas: Area[], itemTypes: ItemType[]) {
    this.name = name;
    this.areas = areas;
    this.items = itemTypes;
  }

  public toString(): string {
    return "MapClass named " + this.name
  }
}
