import {Location} from "./location";

export interface MajorLocation {
  id: number
  name: string
  subLocations: Location[]
}
