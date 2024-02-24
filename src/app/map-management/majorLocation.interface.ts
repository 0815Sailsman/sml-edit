import {LocationInterface} from "./location.interface";

export interface MajorLocationInterface {
  id: number
  name: string
  subLocations: LocationInterface[]
}
