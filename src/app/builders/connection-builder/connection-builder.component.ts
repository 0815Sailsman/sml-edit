import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Connection} from "../model/connection";
import {FormsModule} from "@angular/forms";
import {Location} from "../model/location";
import {BigCondition} from "../model/bigCondition";
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {SelectFromAllComponent} from "../select-from-all/select-from-all.component";
import {MapManagerService} from "../map-management/map-manager.service";
import {AtomicCondition} from "../model/atomicCondition";
import {IdManagerService} from "../map-management/id-manager.service";

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
      if (this.editConnection.availableIf !== undefined) {
        this.condition = this.editConnection.availableIf
      }
    }
  }

  createOrUpdateConnection() {
    if (this.targetLocation != undefined) {
      const connectionID = this.editConnection !== undefined ? this.editConnection?.id : this.idService.nextConnectionID();
      this.connectionCreatedOrUpdated.emit(new Connection(connectionID, this.targetLocation.id, structuredClone(this.condition)));
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
