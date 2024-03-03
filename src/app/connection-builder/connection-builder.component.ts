import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Connection} from "../map-management/connection";
import {FormsModule} from "@angular/forms";
import {Location} from "../map-management/location";
import {BigCondition} from "../map-management/bigCondition";
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {
  SelectFromAllSublocationsComponent
} from "../select-from-all-sublocations/select-from-all-sublocations.component";
import {SelectFromAllComponent} from "../select-from-all/select-from-all.component";
import {EasilySelectable} from "../EasilySelectable";
import {MapManagerService} from "../map-management/map-manager.service";

@Component({
  selector: 'sml-edit-connection-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, ConditionBuilderComponent, SelectFromAllSublocationsComponent, SelectFromAllComponent],
  templateUrl: './connection-builder.component.html',
  styleUrl: './connection-builder.component.css'
})
export class ConnectionBuilderComponent {

  constructor(protected mapService: MapManagerService) {
  }

  @Output() connectionCreated = new EventEmitter<Connection>();
  targetLocation: Location | undefined;
  condition: BigCondition | undefined;

  createNewConnection() {
    if (this.targetLocation != undefined && this.condition != undefined) {
      this.connectionCreated.emit({
        to: this.targetLocation?.id,
        if: this.condition
      })
    }
  }

  updateTargetLocation(newTargetLocation: EasilySelectable) {
    if (<Location> newTargetLocation) {
      this.targetLocation = newTargetLocation as Location
    }
  }

  protected readonly Location = Location;
}
