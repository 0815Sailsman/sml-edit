import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {BigCondition} from "../map-management/bigCondition";
import {FormsModule} from "@angular/forms";
import {Item} from "../map-management/item";
import {MapManagerService} from "../map-management/map-manager.service";
import {SelectFromAllComponent} from "../select-from-all/select-from-all.component";
import {ItemType} from "../map-management/itemType";
import {NgIf} from "@angular/common";
import {ItemBuilderHeaderComponent} from "./item-builder-header/item-builder-header.component";
import {IdManagerService} from "../map-management/id-manager.service";
import {AtomicCondition} from "../map-management/atomicCondition";

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
export class ItemBuilderComponent implements OnChanges {

  constructor(protected mapService: MapManagerService, private idService: IdManagerService) {
  }

  itemType: ItemType | undefined;
  itemCount: number |undefined;
  condition: BigCondition | undefined;
  newItemTypeName: string | undefined;
  editing: boolean = false;

  @Input() allowConditions: boolean |undefined = true;
  @Input() startingConditions: AtomicCondition[] = [];
  @Input() editedItem: Item | undefined;
  @Output() itemCreated = new EventEmitter<Item>();

  ngOnChanges(changes: SimpleChanges) {
    if (this.editedItem !== undefined && !this.editing) {
      this.editing = true;
      this.itemType = this.mapService.itemTypeById(this.editedItem.itemTypeID);
      this.itemCount = this.editedItem.count
      if (this.editedItem.if !== undefined) {
        this.condition = this.editedItem.if
      }
    }
  }

  updateInternalCondition(updatedCondition: BigCondition) {
    this.condition = updatedCondition;
  }

  createNewItem() {
    if (this.itemType != undefined && this.itemCount != undefined) {
      this.itemCreated.emit({
        id: this.idService.nextItemID(),
        itemTypeID: this.itemType.id,
        count: this.itemCount,
        if: this.condition
      })
    }
  }

  confirmEdit() {
    if (this.editedItem !== undefined && this.itemType !== undefined && this.itemCount !== undefined) {
      this.mapService.updateItem({
        id: this.editedItem.id,
        itemTypeID: this.itemType.id,
        count: this.itemCount,
        if: this.condition
      });
    }
    this.editedItem = undefined;
    this.editing = false;
  }
}
