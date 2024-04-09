import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
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
import {
  GraphicalConditionBuilderComponent
} from "../condition-builder/graphical-condition-builder/graphical-condition-builder.component";

@Component({
  selector: 'sml-edit-connection-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, ConditionBuilderComponent, SelectFromAllComponent],
  templateUrl: './connection-builder.component.html',
  styleUrl: './connection-builder.component.css'
})
export class ConnectionBuilderComponent implements OnChanges {

  @ViewChild(ConditionBuilderComponent) conditionBuilder!: ConditionBuilderComponent;

  @Input() startingConditions: AtomicCondition[] = [];
  @Input() editConnection: Connection | undefined;
  @Output() connectionCreatedOrUpdated = new EventEmitter<Connection>();

  constructor(protected mapService: MapManagerService, private idService: IdManagerService) {
  }

  targetLocation: Location | undefined;
  condition: BigCondition | undefined;
  editing: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (this.editConnection !== undefined && !this.editing) {
      this.editing = true;
      this.targetLocation = this.mapService.locationById(this.editConnection.to)
      if (this.editConnection.if !== undefined) {
        this.condition = this.editConnection.if
      }
    }
  }

  createOrUpdateConnection() {
    if (this.targetLocation != undefined) {
      const connectionID = this.editConnection !== undefined ? this.editConnection?.id : this.idService.nextConnectionID();
      this.connectionCreatedOrUpdated.emit({
        id: connectionID,
        to: this.targetLocation?.id,
        if: structuredClone(this.condition)
      })
    }
    this.editConnection = undefined;
    this.editing = false;

    this.targetLocation = undefined;
    this.condition = undefined;
    this.conditionBuilder.clear();
  }

  protected readonly Location = Location;

  updateCondition(condition: BigCondition) {
    this.condition = condition;
  }
}
