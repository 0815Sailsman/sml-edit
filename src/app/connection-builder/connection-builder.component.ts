import {Component, EventEmitter, Output} from '@angular/core';
import {MapManagerService} from "../map-management/map-manager.service";
import {CommonModule} from "@angular/common";
import {Connection} from "../map-management/connection";
import {FormsModule} from "@angular/forms";
import {Location} from "../map-management/location";
import {BigCondition} from "../map-management/bigCondition";

@Component({
  selector: 'sml-edit-connection-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './connection-builder.component.html',
  styleUrl: './connection-builder.component.css'
})
export class ConnectionBuilderComponent {

  @Output() connectionCreated = new EventEmitter<Connection>();
  targetLocation: Location | undefined;
  condition: BigCondition | undefined;

  constructor(protected mapService: MapManagerService) {
  }

  createNewConnection() {
    if (this.targetLocation != undefined && this.condition != undefined) {
      this.connectionCreated.emit({
        to: this.targetLocation?.id,
        if: this.condition
      })
    }
  }
}
