import {Component, EventEmitter, Output} from '@angular/core';
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ItemBuilderComponent} from "../item-builder/item-builder.component";
import {NgForOf} from "@angular/common";
import {ShopItem} from "../map-management/ShopItem";
import {Item} from "../map-management/item";
import {BigCondition} from "../map-management/bigCondition";
import {NPC} from "../map-management/NPC";
import {MapManagerService} from "../map-management/map-manager.service";

@Component({
  selector: 'sml-edit-npc-builder',
  standalone: true,
  imports: [
    ConditionBuilderComponent,
    ReactiveFormsModule,
    FormsModule,
    ItemBuilderComponent,
    NgForOf
  ],
  templateUrl: './npc-builder.component.html',
  styleUrl: './npc-builder.component.css'
})
export class NpcBuilderComponent {

  @Output() npcCreated = new EventEmitter<NPC>();

  constructor(private mapService: MapManagerService) {
  }

  npcName: string | undefined;
  shopItems: ShopItem[] = [];
  newShopItemItem: Item | undefined;
  newShopItemCount: number | undefined;
  newShopItemCost: number | undefined;
  condition: BigCondition | undefined;

  createNewNpc() {
    if (this.npcName !== undefined) {
      this.npcCreated.emit({
        id: ++this.mapService.idCounter,
        shop: this.shopItems,
        name: this.npcName,
        if: this.condition
      })
    }
  }

  addShopItem() {
    if (this.newShopItemItem !== undefined && this.newShopItemCost !== undefined && this.newShopItemCount !== undefined) {
      this.shopItems.push({
        item: this.newShopItemItem,
        count: this.newShopItemCount,
        cost: this.newShopItemCost
      })
    }
  }

  setNewShopItemItem(item: Item) {
    this.newShopItemItem = item;
  }

  updateInternalCondition(updatedCondition: BigCondition) {
    this.condition = updatedCondition;
  }
}
