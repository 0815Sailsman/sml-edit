import {Component, EventEmitter, Input, Output} from '@angular/core';
import {KeyInLocation} from "../KeyInLocation";
import {SingleGenericObjectComponent} from "../single-generic-object/single-generic-object.component";
import {NgForOf, NgIf} from "@angular/common";
import {ObjectBuilderComponent} from "../object-builder/object-builder.component";
import {OtherObject} from "../map-management/otherObject";
import {Enemy} from "../map-management/enemy";
import {AtomicCondition} from "../map-management/atomicCondition";

@Component({
  selector: 'sml-edit-other-object-manager',
  standalone: true,
  imports: [
    SingleGenericObjectComponent,
    NgForOf,
    ObjectBuilderComponent,
    NgIf
  ],
  templateUrl: './other-object-manager.component.html',
  styleUrl: './other-object-manager.component.css'
})
export class OtherObjectManagerComponent {

  @Input() objects: OtherObject[] = [];
  @Output() objectDeleted = new EventEmitter<OtherObject>();
  @Output() objectCreatedOrUpdated = new EventEmitter<OtherObject>();

  showingDetails: boolean = false;
  objectToEdit: OtherObject | undefined

  editObject(object: OtherObject) {
    this.objectToEdit = object;
  }

  deleteObject(object: OtherObject) {
    this.objectDeleted.emit(object);
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails;
  }

  createOrUpdateObject(object: OtherObject) {
    this.objectCreatedOrUpdated.emit(object);
  }

  // todo these are duplicate in every manager! reduce to one location!
  extractConditions(object: OtherObject[]): AtomicCondition[] {
    const objectsWithDuplicates = object
      .flatMap(oldObject => oldObject.availableIf?.subConditions ?? []);
    return this.filterDuplicateConditions(objectsWithDuplicates);
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
