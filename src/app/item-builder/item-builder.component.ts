import { Component } from '@angular/core';
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {BigCondition} from "../map-management/bigCondition";
import {Item} from "../map-management/item";

@Component({
  selector: 'sml-edit-item-builder',
  standalone: true,
    imports: [
        ConditionBuilderComponent
    ],
  templateUrl: './item-builder.component.html',
  styleUrl: './item-builder.component.css'
})
export class ItemBuilderComponent {

  condition: BigCondition | undefined;
  itemName: string | undefined;
  itemCount: number |undefined;

  updateInternalCondition(updatedCondition: BigCondition) {
    this.condition = updatedCondition;
  }

  createNewItem() {
    ;
  }
}
