import {BigCondition} from "./bigCondition";
import {MapManagerService} from "../map-management/map-manager.service";

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
    return this.count + "x " + mapService.itemTypeById(this.itemTypeID).name + " (ID: " + this.id + ") " + this.originString(mapService);
  }

  private originString(mapService: MapManagerService): string {
    let srcLocation = undefined;
    let srcEnemy = undefined;
    let srcNPC = undefined;

    srcLocation = mapService.locationOfItemWithID(this.id);
    if (srcLocation !== undefined) {
      return " in " + srcLocation.toString();
    }

    srcEnemy = mapService.enemyDroppingItemWithID(this.id);
    if (srcEnemy !== undefined) {
      return " dropped By " + srcEnemy.toString(mapService);
    }

    srcNPC = mapService.npcSellingItemWithID(this.id);
    if (srcNPC !== undefined) {
      return " sold By " + srcNPC.toString();
    }

    return "  with unknown origin...";
  }
}
