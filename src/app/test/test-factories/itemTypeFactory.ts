import {ItemType} from "../../model/itemType";

export function anItemType(): ItemType {
  return new ItemType(0, "itemType0");
}

export function anotherItemType(): ItemType {
  return new ItemType(1, "itemType1");
}
