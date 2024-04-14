import {AtomicCondition} from "../model/atomicCondition";
import {BigCondition} from "../model/bigCondition";
import {KeyInLocation} from "../model/KeyInLocation";
import {ObjectInLocation} from "../model/ObjectInLocation";
import {EventEmitter, Input, Output} from "@angular/core";

import { Component } from '@angular/core';

@Component({
  template: ''
})
export abstract class AbstractManager {

  showingDetails: boolean = false;
  abstract objectToEdit: ObjectInLocation | undefined;

  @Input() objects: ObjectInLocation[] = [];
  @Output() objectDeleted = new EventEmitter<ObjectInLocation>();
  @Output() objectCreatedOrUpdated = new EventEmitter<ObjectInLocation>();

  edit(object: ObjectInLocation) {
    this.objectToEdit = object;
  }

  delete(object: ObjectInLocation) {
    this.objectDeleted.emit(object);
  }

  createOrUpdate(object: ObjectInLocation) {
    this.objectCreatedOrUpdated.emit(object);
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails;
  }

  extractConditions(object: {availableIf?: BigCondition}[]): AtomicCondition[] {
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
