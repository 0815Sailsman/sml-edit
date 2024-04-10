import {BigCondition} from "./bigCondition";
import {MapManagerService} from "./map-manager.service";

export class Item {
  id: number
  itemTypeID: number
  count: number
  availableIf?: BigCondition

  constructor(
    id: number,
    itemTypeID: number,
    count: number,
    availableIf?: BigCondition
  ) {
    this.id = id;
    this.itemTypeID = itemTypeID;
    this.count = count;
    this.availableIf = availableIf;
  }

  toString(mapService: MapManagerService): string {
    return mapService.itemTypeById(this.itemTypeID).name;
  }
}
