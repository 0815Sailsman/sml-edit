import {Location} from "./location";

export class Area {
  id: number
  name: string
  locations: Location[]

  constructor(
    id: number,
    name: string,
    locations? : Location[]
    ) {
    this.id = id;
    this.name = name;
    this.locations = locations ?? [];
  }

  toString(): string {
    return this.name;
  }
}
