import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OtherObject} from "../map-management/otherObject";
import {BigCondition} from "../map-management/bigCondition";
import {MapManagerService} from "../map-management/map-manager.service";
import {IdManagerService} from "../map-management/id-manager.service";
import {AtomicCondition} from "../map-management/atomicCondition";
import {NgIf} from "@angular/common";

@Component({
  selector: 'sml-edit-object-builder',
  standalone: true,
  imports: [
    ConditionBuilderComponent,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './object-builder.component.html',
  styleUrl: './object-builder.component.css'
})
export class ObjectBuilderComponent implements OnChanges {

  @ViewChild(ConditionBuilderComponent) conditionBuilder!: ConditionBuilderComponent;

  @Input() startingConditions: AtomicCondition[] = [];
  @Input() editedObject: OtherObject | undefined;
  @Output() objectCreatedOrUpdated = new EventEmitter<OtherObject>();

  constructor(private mapService: MapManagerService, private idService: IdManagerService) {
  }

  objectName: string | undefined;
  condition: BigCondition | undefined;
  editing: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (this.editedObject !== undefined && !this.editing) {
      this.editing = true;
      this.objectName = this.editedObject.name;
      if (this.editedObject.if !== undefined) {
        this.condition = this.editedObject.if
      }
    }
  }

  updateInternalCondition(updatedCondition: BigCondition) {
    this.condition = updatedCondition;
  }

  createOrUpdateNewObject() {
    if (this.objectName != undefined) {
      this.objectCreatedOrUpdated.emit({
        id: this.editedObject !== undefined ? this.editedObject?.id : this.idService.nextObjectID(),
        name: this.objectName,
        if: structuredClone(this.condition)
      })
    }
    this.editedObject = undefined;
    this.editing = false;

    this.objectName = undefined;
    this.condition = undefined;
    this.conditionBuilder.clear();
  }

}
