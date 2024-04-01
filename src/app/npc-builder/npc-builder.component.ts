import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ItemBuilderComponent} from "../item-builder/item-builder.component";
import {NgForOf} from "@angular/common";
import {ShopItem} from "../map-management/ShopItem";
import {Item} from "../map-management/item";
import {BigCondition} from "../map-management/bigCondition";
import {NPC} from "../map-management/NPC";
import {MapManagerService} from "../map-management/map-manager.service";
import {ItemBuilderHeaderComponent} from "../item-builder/item-builder-header/item-builder-header.component";
import {ItemType} from "../map-management/itemType";
import {IdManagerService} from "../map-management/id-manager.service";
import {AtomicCondition} from "../map-management/atomicCondition";

@Component({
  selector: 'sml-edit-npc-builder',
  standalone: true,
  imports: [
    ConditionBuilderComponent,
    ReactiveFormsModule,
    FormsModule,
    ItemBuilderComponent,
    NgForOf,
    ItemBuilderHeaderComponent
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

  addShopItem() {
    if (this.newShopItemItemType !== undefined && this.newShopItemCost !== undefined && this.newShopItemCount !== undefined) {
      this.shopItems.push({
        item: {
          id: this.idService.nextItemID(),
          itemTypeID: this.newShopItemItemType.id,
          count: 1
        },
        count: this.newShopItemCount,
        cost: this.newShopItemCost
      })
    }
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
