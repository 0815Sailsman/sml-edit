import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Connection} from "../map-management/connection";
import {FormsModule} from "@angular/forms";
import {Location} from "../map-management/location";
import {BigCondition} from "../map-management/bigCondition";
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {SelectFromAllComponent} from "../select-from-all/select-from-all.component";
import {EasilySelectable} from "../EasilySelectable";
import {MapManagerService} from "../map-management/map-manager.service";
import {AtomicCondition} from "../map-management/atomicCondition";
import {IdManagerService} from "../map-management/id-manager.service";

@Component({
  selector: 'sml-edit-connection-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, ConditionBuilderComponent, SelectFromAllComponent],
  templateUrl: './connection-builder.component.html',
  styleUrl: './connection-builder.component.css'
})
export class ConnectionBuilderComponent implements OnChanges {

  @Input() startingConditions: AtomicCondition[] = [];
  @Input() editConnection: Connection | undefined;
  @Output() connectionCreated = new EventEmitter<Connection>();

  constructor(protected mapService: MapManagerService, private idService: IdManagerService) {
  }

  targetLocation: Location | undefined;
  condition: BigCondition  = {
    grammar: "",
    subConditions: this.startingConditions
  };

  ngOnChanges(changes: SimpleChanges) {
    if (this.editConnection !== undefined) {
      this.targetLocation = this.mapService.minorLocationById(this.editConnection.to)
      if (this.editConnection.if !== undefined) {
        this.condition = this.editConnection.if
      }
    }
  }

  createNewConnection() {
    if (this.targetLocation != undefined) {
      this.connectionCreated.emit({
        id: this.idService.nextConnectionID(),
        to: this.targetLocation?.id,
        if: this.condition// todo pass undefined when empty condition
      })
    }
  }

  protected readonly Location = Location;

  confirmEdit() {
    ;
  }
}
