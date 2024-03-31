import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ItemBuilderHeaderComponent} from "../../item-builder/item-builder-header/item-builder-header.component";
import {Item} from "../../map-management/item";
import {Drop} from "../../map-management/drop";
import {ItemType} from "../../map-management/itemType";
import {MapManagerService} from "../../map-management/map-manager.service";
import {IdManagerService} from "../../map-management/id-manager.service";

@Component({
  selector: 'sml-edit-drop-builder',
  standalone: true,
  imports: [
    FormsModule,
    ItemBuilderHeaderComponent
  ],
  templateUrl: './drop-builder.component.html',
  styleUrl: './drop-builder.component.css'
})
export class DropBuilderComponent {

  @Output() createDrop = new EventEmitter<Drop>();

  constructor(private mapService: MapManagerService, private idService: IdManagerService) {
  }

  dropChance: number = 100;
  dropItemType: ItemType | undefined;
  dropItemCount: number | undefined;

  fireCreateDrop() {
    if (this.dropItemType !== undefined && this.dropItemCount !== undefined && this.dropChance !== undefined) {
      this.createDrop.emit({
        item: {
          id: this.idService.nextItemID(),
          itemTypeID: this.dropItemType.id,
          count: this.dropItemCount
        },
        chance: this.dropChance
      })
    }
  }

  updateItemType(newType: ItemType) {
    this.dropItemType = newType;
  }

  updateItemCount(newCount: number) {
    this.dropItemCount = newCount;
  }
}
