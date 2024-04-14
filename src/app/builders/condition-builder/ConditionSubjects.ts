import {Location} from "../model/location";
import {Item} from "../model/item";
import {Enemy} from "../model/enemy";
import {OtherObject} from "../model/otherObject";

export enum ConditionSubjects {
  Location = "Location",
  Item = "Item",
  Enemy = "Enemy",
  OtherObject = "Object"
}

export type ConditionSubjectsType = Location | Item | Enemy | OtherObject
