import {MajorLocationInterface} from "./majorLocation.interface";

export class Map {
  name: string
  locations: MajorLocationInterface[]

  constructor(name: string, locations: MajorLocationInterface[]) {
    this.name = name;
    this.locations = locations;
  }

  public toString(): String {
    return "MapClass named " + this.name
  }
}
