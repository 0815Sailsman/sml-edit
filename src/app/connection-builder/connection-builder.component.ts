import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Connection} from "../map-management/connection";
import {FormsModule} from "@angular/forms";
import {Location} from "../map-management/location";
import {BigCondition} from "../map-management/bigCondition";
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {
  SelectFromAllSublocationsComponent
} from "./select-from-all-sublocations/select-from-all-sublocations.component";

@Component({
  selector: 'sml-edit-connection-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, ConditionBuilderComponent, SelectFromAllSublocationsComponent],
  templateUrl: './connection-builder.component.html',
  styleUrl: './connection-builder.component.css'
})
export class ConnectionBuilderComponent {

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

  updateTargetLocation(newTargetLocation: Location) {
    this.targetLocation = newTargetLocation
  }
}
