import {BigCondition} from "./bigCondition";
import {MapManagerService} from "../map-management/map-manager.service";

export class Connection {

  id: number;
  to: number;
  availableIf?: BigCondition;

  constructor(
    id: number,
    to: number,
    availableIf?: BigCondition
  ) {
    this.id = id;
    this.to = to;
    this.availableIf = availableIf;
  }

  toString(mapService: MapManagerService): string {
    return "to " + mapService.locationById(this.to).name + " (ID: " + this.to + ") ";
  }
}
