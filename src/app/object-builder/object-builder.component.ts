import {Component, EventEmitter, Output} from '@angular/core';
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OtherObject} from "../map-management/otherObject";
import {BigCondition} from "../map-management/bigCondition";
import {MapManagerService} from "../map-management/map-manager.service";
import {IdManagerService} from "../map-management/id-manager.service";

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

  @Output() objectCreated = new EventEmitter<OtherObject>();

  constructor(private mapService: MapManagerService, private idService: IdManagerService) {
  }

  objectName: string | undefined;
  condition: BigCondition | undefined;

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
