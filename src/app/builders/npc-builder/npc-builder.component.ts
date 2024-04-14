import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ItemBuilderComponent} from "../item-builder/item-builder.component";
import {NgForOf, NgIf} from "@angular/common";
import {ShopItem} from "../model/ShopItem";
import {Item} from "../model/item";
import {BigCondition} from "../model/bigCondition";
import {NPC} from "../model/NPC";
import {MapManagerService} from "../map-management/map-manager.service";
import {ItemBuilderHeaderComponent} from "../item-builder/item-builder-header/item-builder-header.component";
import {ItemType} from "../model/itemType";
import {IdManagerService} from "../map-management/id-manager.service";
import {AtomicCondition} from "../model/atomicCondition";
import {Drop} from "../model/drop";
import {ShopItemBuilderComponent} from "./shop-item-builder/shop-item-builder.component";

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
    NgIf,
    ShopItemBuilderComponent
  ],
  templateUrl: './npc-builder.component.html',
  styleUrl: './npc-builder.component.css'
})
export class NpcBuilderComponent implements OnChanges {

  @ViewChild(ConditionBuilderComponent) conditionBuilder!: ConditionBuilderComponent;
  @ViewChild(ShopItemBuilderComponent) shopItemBuilder!: ShopItemBuilderComponent;

  @Input() startingConditions: AtomicCondition[] = [];
  @Input() editedNPC: NPC | undefined;
  @Output() npcCreatedOrUpdated = new EventEmitter<NPC>();

  constructor(protected mapService: MapManagerService, private idService: IdManagerService) {
  }

  npcName: string | undefined;
  shopItems: ShopItem[] = [];
  shopItemToEdit: ShopItem | undefined;
  condition: BigCondition | undefined;
  editing: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (this.editedNPC !== undefined && !this.editing) {
      this.editing = true;
      this.npcName = this.editedNPC.name;
      this.shopItems = this.editedNPC.shop;
      if (this.editedNPC.availableIf !== undefined) {
        this.condition = this.editedNPC.availableIf;
      }
    }
  }

  createOrUpdateNewNpc() {
    if (this.npcName !== undefined) {
      this.npcCreatedOrUpdated.emit(new NPC(
        this.editedNPC !== undefined ? this.editedNPC.id : this.idService.nextNPCID(),
        this.npcName,
        this.shopItems,
        structuredClone(this.condition)
      ));
    }
    this.editedNPC = undefined;
    this.editing = false;

    this.npcName = undefined;
    this.shopItems = [];
    this.condition = undefined;
    this.shopItemBuilder.clear();
    this.conditionBuilder.clear();
  }

  addOrUpdateShopItem(shopItem: ShopItem) {
    const shopItemIndex = this.findIndexForShopItem(shopItem);
    if (shopItemIndex == -1) {
      this.shopItems.push(shopItem);
    } else {
      this.shopItems[shopItemIndex] = shopItem;
    }
  }

  editShopItem(shopItem: ShopItem) {
    this.shopItemToEdit = shopItem
  }

  deleteShopItem(shopItem: ShopItem) {
    this.shopItems = this.shopItems.filter(existingItem => existingItem.item.itemTypeID !== shopItem.item.itemTypeID)
  }

  updateInternalCondition(updatedCondition: BigCondition) {
    this.condition = updatedCondition;
  }

  findIndexForShopItem(shopItem: ShopItem): number {
    return this.shopItems
      .map(shopItem => shopItem.item)
      .findIndex(item => item.itemTypeID == shopItem.item.itemTypeID);
  }
}
