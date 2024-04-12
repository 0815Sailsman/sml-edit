import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemBuilderComponent} from "../item-builder/item-builder.component";
import {KeyInLocation} from "../KeyInLocation";
import {SingleGenericObjectComponent} from "../single-generic-object/single-generic-object.component";
import {NgForOf, NgIf} from "@angular/common";
import {AtomicCondition} from "../map-management/atomicCondition";
import {Item} from "../map-management/item";

@Component({
  selector: 'sml-edit-item-manager',
  standalone: true,
  imports: [
    ItemBuilderComponent,
    SingleGenericObjectComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './item-manager.component.html',
  styleUrl: './item-manager.component.css'
})
export class ItemManagerComponent {

  @Input() items: Item[] = [];
  @Output() itemDeleted = new EventEmitter<Item>();
  @Output() itemCreatedOrUpdated = new EventEmitter<Item>();

  showingDetails: boolean = false;
  itemToEdit: Item | undefined;

  editItem(item: Item) {
    this.itemToEdit = item;
  }

  deleteItem(item: Item) {
    this.itemDeleted.emit(item);
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails
  }

  createOrUpdateItem(item: Item) {
    this.itemCreatedOrUpdated.emit(item)
  }

  // todo these are duplicate in every manager! reduce to one location!
  extractConditions(items: Item[]): AtomicCondition[] {
    const itemsWithDuplicates = items
      .flatMap(oldItem => oldItem.availableIf?.subConditions ?? []);
    return this.filterDuplicateConditions(itemsWithDuplicates);
  }

  filterDuplicateConditions(arr: AtomicCondition[]): AtomicCondition[] {
    const seen = new Set<string>(); // Set to store string representations of objects
    return arr.filter(item => {
      const stringified = JSON.stringify(item); // Convert object to string
      if (seen.has(stringified)) {
        return false;
      } else {
        seen.add(stringified);
        return true;
      }
    });
  }

  protected readonly KeyInLocation = KeyInLocation;
}
