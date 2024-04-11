import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ItemBuilderHeaderComponent} from "../../item-builder/item-builder-header/item-builder-header.component";
import {NgIf} from "@angular/common";
import {ItemType} from "../../map-management/itemType";
import {MapManagerService} from "../../map-management/map-manager.service";
import {IdManagerService} from "../../map-management/id-manager.service";
import {ShopItem} from "../../map-management/ShopItem";
import {Item} from "../../map-management/item";

@Component({
  selector: 'sml-edit-shop-item-builder',
  standalone: true,
  imports: [
    FormsModule,
    ItemBuilderHeaderComponent,
    NgIf
  ],
  templateUrl: './shop-item-builder.component.html',
  styleUrl: './shop-item-builder.component.css'
})
export class ShopItemBuilderComponent implements OnChanges {

  shopItemType: ItemType | undefined;
  shopItemCount: number | undefined;
  shopItemCost: number | undefined;
  editing: boolean = false;

  constructor(private mapService: MapManagerService, private idService: IdManagerService) {
  }

  @Input() editedShopItem: ShopItem | undefined;
  @Output() shopItemCreatedOrUpdated = new EventEmitter<ShopItem>();

  ngOnChanges(changes: SimpleChanges) {
    if (this.editedShopItem !== undefined && !this.editing) {
      this.editing = true;
      this.shopItemType = this.mapService.itemTypeById(this.editedShopItem.item.itemTypeID);
      this.shopItemCount = this.editedShopItem.count;
      this.shopItemCost = this.editedShopItem.count;
    }
  }

  fireCreateOrUpdateShopItem() {
    if (this.shopItemType !== undefined && this.shopItemCount !== undefined && this.shopItemCost !== undefined) {
      this.shopItemCreatedOrUpdated.emit({
        item: new Item(
          this.editedShopItem !== undefined ? this.editedShopItem.item.id : this.idService.nextItemID(),
          this.shopItemType.id,
          1
        ),
        count: this.shopItemCount,
        cost: this.shopItemCost
      });
      this.editedShopItem = undefined;
      this.editing = false;
      this.clear();
    }
  }

  clear() {
    this.shopItemType = undefined;
    this.shopItemCost = undefined;
    this.shopItemCount = undefined;
  }

}
