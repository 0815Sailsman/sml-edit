import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {BigCondition} from "../map-management/bigCondition";
import {FormsModule} from "@angular/forms";
import {Item} from "../map-management/item";
import {MapManagerService} from "../map-management/map-manager.service";
import {SelectFromAllComponent} from "../select-from-all/select-from-all.component";
import {ItemType} from "../map-management/itemType";
import {NgIf} from "@angular/common";
import {ItemBuilderHeaderComponent} from "./item-builder-header/item-builder-header.component";

@Component({
  selector: 'sml-edit-item-builder',
  standalone: true,
  imports: [
    ConditionBuilderComponent,
    FormsModule,
    SelectFromAllComponent,
    NgIf,
    ItemBuilderHeaderComponent
  ],
  templateUrl: './item-builder.component.html',
  styleUrl: './item-builder.component.css'
})
export class ItemBuilderComponent {

  constructor(protected mapService: MapManagerService) {
  }

  itemType: ItemType | undefined;
  itemCount: number |undefined;
  condition: BigCondition | undefined;
  newItemTypeName: string | undefined;

  @Input() allowConditions: boolean |undefined = true;
  @Output() itemCreated = new EventEmitter<Item>();

  updateInternalCondition(updatedCondition: BigCondition) {
    this.condition = updatedCondition;
  }

  createNewItem() {
    if (this.itemType != undefined && this.itemCount != undefined) {
      this.itemCreated.emit({
        id: ++this.mapService.idCounter,
        itemTypeID: this.itemType.id,
        count: this.itemCount,
        if: this.condition
      })
    }
  }

  updateItemCount(newItemCount: number) {
    this.itemCount = newItemCount;
  }

  updateItemType(newItemType: ItemType) {
    this.itemType = newItemType;
  }
}
