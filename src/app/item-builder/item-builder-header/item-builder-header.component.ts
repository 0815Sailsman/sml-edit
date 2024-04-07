import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {MapManagerService} from "../../map-management/map-manager.service";
import {ItemType} from "../../map-management/itemType";
import {FormsModule} from "@angular/forms";
import {SelectFromAllComponent} from "../../select-from-all/select-from-all.component";
import {Item} from "../../map-management/item";

@Component({
  selector: 'sml-edit-item-builder-header',
  standalone: true,
  imports: [
    FormsModule,
    SelectFromAllComponent
  ],
  templateUrl: './item-builder-header.component.html',
  styleUrl: './item-builder-header.component.css'
})
export class ItemBuilderHeaderComponent {

  newItemTypeName: string | undefined;

  constructor(protected mapService: MapManagerService) {
  }

  @Input() itemType: ItemType | undefined;
  @Input() itemCount: number |undefined;
  @Output() itemTypeChange = new EventEmitter<ItemType>();
  @Output() itemCountChange = new EventEmitter<number>();

  createNewItemType() {
    if (this.newItemTypeName !== undefined) {
      const newItemTypeID = this.mapService.addItemTypeWithName(this.newItemTypeName);
      if (newItemTypeID !== undefined) {
        this.itemType = this.mapService.itemTypeById(newItemTypeID);
        this.itemTypeChange.emit(this.itemType);
      }
    }
  }

  fireTypeChange() {
    this.itemTypeChange.emit(this.itemType)
  }

  fireCountChange($event: Event) {
    this.itemCountChange.emit(this.itemCount)
  }
}
