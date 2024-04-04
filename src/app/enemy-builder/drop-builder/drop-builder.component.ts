import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ItemBuilderHeaderComponent} from "../../item-builder/item-builder-header/item-builder-header.component";
import {Item} from "../../map-management/item";
import {Drop} from "../../map-management/drop";
import {ItemType} from "../../map-management/itemType";
import {MapManagerService} from "../../map-management/map-manager.service";
import {IdManagerService} from "../../map-management/id-manager.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'sml-edit-drop-builder',
  standalone: true,
  imports: [
    FormsModule,
    ItemBuilderHeaderComponent,
    NgIf
  ],
  templateUrl: './drop-builder.component.html',
  styleUrl: './drop-builder.component.css'
})
export class DropBuilderComponent implements OnChanges{

  dropChance: number = 100;
  dropItemType: ItemType | undefined;
  dropItemCount: number | undefined;
  editing: boolean = false;

  constructor(private mapService: MapManagerService, private idService: IdManagerService) {
  }

  @Input() editedDrop: Drop | undefined;
  @Output() dropCreatedOrUpdated = new EventEmitter<Drop>();

  ngOnChanges(changes: SimpleChanges) {
    if (this.editedDrop !== undefined && !this.editing) {
      this.editing = true;
      this.dropItemType = this.mapService.itemTypeById(this.editedDrop.item.itemTypeID);
      this.dropItemCount = this.editedDrop.item.count;
      this.dropChance = this.editedDrop.chance;
    }
  }

  fireCreateOrUpdateDrop() {
    if (this.dropItemType !== undefined && this.dropItemCount !== undefined && this.dropChance !== undefined) {
      this.dropCreatedOrUpdated.emit({
        item: {
          id: this.editedDrop !== undefined ? this.editedDrop.item.id : this.idService.nextItemID(),
          itemTypeID: this.dropItemType.id,
          count: this.dropItemCount
        },
        chance: this.dropChance
      })
    }
  }
}
