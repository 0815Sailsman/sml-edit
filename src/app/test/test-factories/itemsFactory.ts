import {Item} from "../../model/item";

export function anItem(): Item {
  return new Item(0,0,1);
}

export function anotherItem(): Item {
  return new Item(1,1,1);
}

export function aThirdItem(): Item {
  return new Item(2,2,2);
}
