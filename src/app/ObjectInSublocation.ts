import {Item} from "./map-management/item";
import {Connection} from "./map-management/connection";
import {Enemy} from "./map-management/enemy";
import {NPC} from "./map-management/NPC";
import {OtherObject} from "./map-management/otherObject";

export type ObjectInSublocation = Item | Connection | Enemy | NPC | OtherObject;
