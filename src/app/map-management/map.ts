import {MajorLocation} from "./majorLocation";

export class Map {
  name: string
  locations: MajorLocation[]

  constructor(name: string, locations: MajorLocation[]) {
    this.name = name;
    this.locations = locations;
  }

  public toString(): string {
    return "MapClass named " + this.name
  }
}
