import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OtherObject} from "../map-management/otherObject";
import {BigCondition} from "../map-management/bigCondition";
import {MapManagerService} from "../map-management/map-manager.service";
import {IdManagerService} from "../map-management/id-manager.service";
import {AtomicCondition} from "../map-management/atomicCondition";

@Component({
  selector: 'sml-edit-object-builder',
  standalone: true,
  imports: [
    ConditionBuilderComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './object-builder.component.html',
  styleUrl: './object-builder.component.css'
})
export class ObjectBuilderComponent {

  objectName: string | undefined;
  condition: BigCondition | undefined;

  constructor(private mapService: MapManagerService, private idService: IdManagerService) {
  }

  @Input() startingConditions: AtomicCondition[] = [];
  @Output() objectCreated = new EventEmitter<OtherObject>();

  updateInternalCondition(updatedCondition: BigCondition) {
    this.condition = updatedCondition;
  }

  createNewObject() {
    if (this.objectName != undefined) {
      this.objectCreated.emit({
        id: this.idService.nextObjectID(),
        name: this.objectName,
        if: this.condition
      })
    }
  }

}
