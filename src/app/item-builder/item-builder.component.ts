import {Component, EventEmitter, Output} from '@angular/core';
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {BigCondition} from "../map-management/bigCondition";
import {FormsModule} from "@angular/forms";
import {Item} from "../map-management/item";
import {MapManagerService} from "../map-management/map-manager.service";

@Component({
  selector: 'sml-edit-item-builder',
  standalone: true,
  imports: [
    ConditionBuilderComponent,
    FormsModule
  ],
  templateUrl: './item-builder.component.html',
  styleUrl: './item-builder.component.css'
})
export class ItemBuilderComponent {

  constructor(private mapService: MapManagerService) {
  }

  itemName: string | undefined;
  itemCount: number |undefined;
  condition: BigCondition | undefined;

  @Output() itemCreated = new EventEmitter<Item>();

  updateInternalCondition(updatedCondition: BigCondition) {
    this.condition = updatedCondition;
  }

  createNewItem() {
    if (this.itemName != undefined && this.itemCount != undefined) {
      this.itemCreated.emit({
        id: ++this.mapService.idCounter,
        name: this.itemName,
        count: this.itemCount,
        if: this.condition
      })
    }
  }
}
