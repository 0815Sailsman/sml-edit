import {Enemy} from "./map-management/enemy";
import {Item} from "./map-management/item";
import {NPC} from "./map-management/NPC";
import {MajorLocation} from "./map-management/majorLocation";
import {OtherObject} from "./map-management/otherObject";
import {Location} from "./map-management/location";
import {ItemType} from "./map-management/itemType";

export type EasilySelectable = Location | Item | Enemy | NPC | MajorLocation | OtherObject | ItemType
