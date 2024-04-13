import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemBuilderComponent} from "../../item-builder/item-builder.component";
import {SingleGenericObjectComponent} from "../../single-generic-object/single-generic-object.component";
import {NgForOf, NgIf} from "@angular/common";
import {Item} from "../../map-management/item";
import {AbstractManager} from "../abstract-manager";

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
export class ItemManagerComponent extends AbstractManager {

  @Input() items: Item[] = [];
  @Output() itemDeleted = new EventEmitter<Item>();
  @Output() itemCreatedOrUpdated = new EventEmitter<Item>();

  itemToEdit: Item | undefined;

  edit(item: Item) {
    this.itemToEdit = item;
  }

  delete(item: Item) {
    this.itemDeleted.emit(item);
  }

  createOrUpdate(item: Item) {
    this.itemCreatedOrUpdated.emit(item)
  }
}
