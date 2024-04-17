import {Location} from "../../model/location";
import {Connection} from "../../model/connection";
import {Item} from "../../model/item";
import {Enemy} from "../../model/enemy";
import {OtherObject} from "../../model/otherObject";
import {NPC} from "../../model/NPC";

export function aLocationWithoutAnything(): Location {
  return new Location(0,"location0",[],[],[],[],[]);
}

export function anotherLocationWithoutAnything(): Location {
  return new Location(1,"location1",[],[],[],[],[]);
}

export function aLocationWith({connections=[], items=[], enemies=[], objects=[], npcs=[]}: LocationParams): Location {
  return new Location(0,"location0",connections,items,enemies,objects,npcs);
}

export function anotherLocationWith({connections=[], items=[], enemies=[], objects=[], npcs=[]}: LocationParams): Location {
  return new Location(1,"location1",connections,items,enemies,objects,npcs);
}

export interface LocationParams {
  connections?: Connection[],
  items?: Item[],
  enemies?: Enemy[],
  objects?: OtherObject[],
  npcs?: NPC[]
}
