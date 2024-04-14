import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {BigCondition} from "../../model/bigCondition";
import {FormsModule} from "@angular/forms";
import {Item} from "../../model/item";
import {MapManagerService} from "../../map-management/map-manager.service";
import {SelectFromAllComponent} from "../../select-from-all/select-from-all.component";
import {ItemType} from "../../model/itemType";
import {NgIf} from "@angular/common";
import {ItemBuilderHeaderComponent} from "../item-builder-header/item-builder-header.component";
import {IdManagerService} from "../../map-management/id-manager.service";
import {AtomicCondition} from "../../model/atomicCondition";

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

  @ViewChild(ConditionBuilderComponent) conditionBuilder!: ConditionBuilderComponent;

  @Input() allowConditions: boolean |undefined = true;
  @Input() startingConditions: AtomicCondition[] = [];
  @Input() editedItem: Item | undefined;
  @Output() itemCreatedOrUpdated = new EventEmitter<Item>();

  constructor(protected mapService: MapManagerService, private idService: IdManagerService) {
  }

  itemType: ItemType | undefined;
  itemCount: number |undefined;
  condition: BigCondition | undefined;
  newItemTypeName: string | undefined;
  editing: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (this.editedItem !== undefined && !this.editing) {
      this.editing = true;
      this.itemType = this.mapService.itemTypeById(this.editedItem.itemTypeID);
      this.itemCount = this.editedItem.count
      if (this.editedItem.availableIf !== undefined) {
        this.condition = this.editedItem.availableIf
      }
    }
  }

  updateInternalCondition(updatedCondition: BigCondition) {
    this.condition = updatedCondition;
  }

  createOrUpdateNewItem() {
    if (this.itemType != undefined && this.itemCount != undefined) {
      this.itemCreatedOrUpdated.emit(new Item(
        this.editedItem !== undefined ? this.editedItem.id : this.idService.nextItemID(),
        this.itemType.id,
        this.itemCount,
        structuredClone(this.condition)
      ));
    }
    this.editedItem = undefined;
    this.editing = false;

    this.itemType = undefined;
    this.itemCount = undefined;
    this.condition = undefined;
    this.conditionBuilder.clear();
  }
}
