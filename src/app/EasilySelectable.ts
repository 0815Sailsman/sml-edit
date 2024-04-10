import {Enemy} from "./map-management/enemy";
import {Item} from "./map-management/item";
import {NPC} from "./map-management/NPC";
import {Area} from "./map-management/area";
import {OtherObject} from "./map-management/otherObject";
import {Location} from "./map-management/location";
import {ItemType} from "./map-management/itemType";
import {MapManagerService} from "./map-management/map-manager.service";

export type EasilySelectable = Location | Item | Enemy | NPC | Area | OtherObject | ItemType

// becomes
export interface EasilySelectableInterface {
  id: number,
  toString: (mapService: MapManagerService | null) => string
}
