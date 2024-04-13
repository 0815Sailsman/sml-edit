import {AtomicCondition} from "../map-management/atomicCondition";
import {BigCondition} from "../map-management/bigCondition";
import {KeyInLocation} from "../KeyInLocation";
import {OtherObject} from "../map-management/otherObject";
import {ObjectInLocation} from "../ObjectInLocation";

export abstract class AbstractManager {

  showingDetails: boolean = false;

  abstract edit(object: ObjectInLocation): void;
  abstract delete(object: ObjectInLocation): void;
  abstract createOrUpdate(object: ObjectInLocation): void;

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
