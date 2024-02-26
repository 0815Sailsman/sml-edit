import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule} from "@angular/common";
import { SingleGenericObjectComponent } from "../single-generic-object/single-generic-object.component";
import {Location} from "../map-management/location";
import {Pair} from "../Pair";
import {KeyInSublocation} from "../KeyInSublocation";

@Component({
  selector: 'sml-edit-generic-object-manager',
  standalone: true,
  imports: [CommonModule, SingleGenericObjectComponent],
  templateUrl: './generic-object-manager.component.html',
  styleUrl: './generic-object-manager.component.css'
})
export class GenericObjectManagerComponent<T> {

  @Input() genericObjectArray?: T[];
  @Input() name: string = "";
  @Input() key!: KeyInSublocation;
  @Input() objectToString: (a: T | undefined) => string = (obj : T | undefined) => "uninitialized name";
  @Output() objectDeleted = new EventEmitter<Pair<T, KeyInSublocation>>();


  deleteObject(pairOfObjectAndKey: Pair<T, KeyInSublocation>) {
    this.objectDeleted.emit(pairOfObjectAndKey)
  }
}
