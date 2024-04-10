import {MapManagerService} from "./map-management/map-manager.service";

export interface EasilySelectable {
  id: number,
  toString: (mapService: MapManagerService | null) => string
}
