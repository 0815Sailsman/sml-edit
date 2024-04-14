import {Item} from "./item";
import {Connection} from "./connection";
import {Enemy} from "./enemy";
import {NPC} from "./NPC";
import {OtherObject} from "./otherObject";

export type ObjectInLocation = Connection | Item | Enemy | NPC | OtherObject;
