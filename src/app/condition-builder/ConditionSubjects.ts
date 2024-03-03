import {Location} from "../map-management/location";
import {Item} from "../map-management/item";
import {Enemy} from "../map-management/enemy";
import {OtherObject} from "../map-management/otherObject";

export enum ConditionSubjects {
  Location = "Location",
  Item = "Item",
  Enemy = "Enemy",
  OtherObject = "Object"
}

export type ConditionSubjectsType = Location | Item | Enemy | OtherObject
