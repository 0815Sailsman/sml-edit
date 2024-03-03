import {Enemy} from "./map-management/enemy";
import {Item} from "./map-management/item";
import {NPC} from "./map-management/NPC";
import {MajorLocation} from "./map-management/majorLocation";
import {OtherObject} from "./map-management/otherObject";
import {Location} from "./map-management/location";

export type EasilySelectable = Location | Item | Enemy | NPC | MajorLocation | OtherObject
