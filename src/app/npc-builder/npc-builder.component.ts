import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ItemBuilderComponent} from "../item-builder/item-builder.component";
import {NgForOf, NgIf} from "@angular/common";
import {ShopItem} from "../map-management/ShopItem";
import {Item} from "../map-management/item";
import {BigCondition} from "../map-management/bigCondition";
import {NPC} from "../map-management/NPC";
import {MapManagerService} from "../map-management/map-manager.service";
import {ItemBuilderHeaderComponent} from "../item-builder/item-builder-header/item-builder-header.component";
import {ItemType} from "../map-management/itemType";
import {IdManagerService} from "../map-management/id-manager.service";
import {AtomicCondition} from "../map-management/atomicCondition";
import {Drop} from "../map-management/drop";

@Component({
  selector: 'sml-edit-npc-builder',
  standalone: true,
  imports: [
    ConditionBuilderComponent,
    ReactiveFormsModule,
    FormsModule,
    ItemBuilderComponent,
    NgForOf,
    ItemBuilderHeaderComponent,
    NgIf
  ],
  templateUrl: './npc-builder.component.html',
  styleUrl: './npc-builder.component.css'
})
export class NpcBuilderComponent {

  npcName: string | undefined;
  shopItems: ShopItem[] = [];
  newShopItemItemType: ItemType | undefined;
  newShopItemCount: number | undefined;
  newShopItemCost: number | undefined;
  condition: BigCondition | undefined;
  editedShopItemID: number | undefined;

  constructor(protected mapService: MapManagerService, private idService: IdManagerService) {
  }

  @Input() startingConditions: AtomicCondition[] = [];
  @Output() npcCreated = new EventEmitter<NPC>();

  createNewNpc() {
    if (this.npcName !== undefined) {
      this.npcCreated.emit({
        id: this.idService.nextNPCID(),
        shop: this.shopItems,
        name: this.npcName,
        if: this.condition
      })
    }
  }

  addOrUpdateShopItem() {
    if (this.newShopItemItemType !== undefined && this.newShopItemCost !== undefined && this.newShopItemCount !== undefined) {
      const shopItemObject = {
        item: {
          id: this.editedShopItemID !== undefined ? this.editedShopItemID : this.idService.nextItemID(),
          itemTypeID: this.newShopItemItemType.id,
          count: 1
        },
        count: this.newShopItemCount,
        cost: this.newShopItemCost
      };
      if (this.editedShopItemID !== undefined) {
        const existingShopItemIndex = this.shopItems.findIndex(obj => obj.item.id == this.editedShopItemID)
        this.shopItems[existingShopItemIndex] = shopItemObject;
      } else {
        this.shopItems.push(shopItemObject);
      }
    }
    this.editedShopItemID = undefined;
  }

  editShopItem(shopItem: ShopItem) {
    this.newShopItemCount = shopItem.item.count;
    this.newShopItemItemType = this.mapService.itemTypeById(shopItem.item.itemTypeID);
    this.newShopItemCost = shopItem.cost;
    this.editedShopItemID = shopItem.item.id;
  }

  deleteShopItem(shopItem: ShopItem) {
    this.shopItems = this.shopItems.filter(existingItem => existingItem.item.itemTypeID !== shopItem.item.itemTypeID)
  }

  updateInternalCondition(updatedCondition: BigCondition) {
    this.condition = updatedCondition;
  }

  updateNewShopItemCount(newCount: number) {
    this.newShopItemCount = newCount;
  }

  updateNewShopItemItemType(newType: ItemType) {
    this.newShopItemItemType = newType;
  }
}
