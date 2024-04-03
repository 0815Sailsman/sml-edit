import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MapManagerService} from "../../map-management/map-manager.service";
import {ItemType} from "../../map-management/itemType";
import {FormsModule} from "@angular/forms";
import {SelectFromAllComponent} from "../../select-from-all/select-from-all.component";

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

  @Input() itemType: ItemType | undefined;
  newItemTypeName: string | undefined;
  @Input() itemCount: number |undefined;

  constructor(protected mapService: MapManagerService) {
  }

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
