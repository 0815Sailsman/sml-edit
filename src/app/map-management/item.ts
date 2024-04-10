import {BigCondition} from "./bigCondition";
import {MapManagerService} from "./map-manager.service";
import {map} from "rxjs";

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
    return "ID: " + this.id + " | " + this.count + "x " + mapService.itemTypeById(this.itemTypeID).name + this.originString(mapService);
  }

  private originString(mapService: MapManagerService): string {
    let srcLocation = undefined;
    let srcEnemy = undefined;
    let srcNPC = undefined;

    srcLocation = mapService.locationOfItemWithID(this.id);
    if (srcLocation !== undefined) {
      return " in " + srcLocation.name;
    }

    srcEnemy = mapService.enemyDroppingItemWithID(this.id);
    if (srcEnemy !== undefined) {
      return " dropped By " + srcEnemy.name;
    }

    srcNPC = mapService.npcSellingItemWithID(this.id);
    if (srcNPC !== undefined) {
      return " sold By " + srcNPC.name;
    }

    return "  with unknown origin...";
  }
}
