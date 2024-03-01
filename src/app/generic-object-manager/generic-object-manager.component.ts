import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule} from "@angular/common";
import { SingleGenericObjectComponent } from "../single-generic-object/single-generic-object.component";
import {Location} from "../map-management/location";
import {Pair} from "../Pair";
import {KeyInSublocation, nameOf} from "../KeyInSublocation";
import {GenericObjectBuilderComponent} from "../generic-object-builder/generic-object-builder.component";
import {ConnectionBuilderComponent} from "../connection-builder/connection-builder.component";
import {ObjectInSublocation} from "../ObjectInSublocation";

@Component({
  selector: 'sml-edit-generic-object-manager',
  standalone: true,
  imports: [CommonModule, SingleGenericObjectComponent, GenericObjectBuilderComponent, ConnectionBuilderComponent],
  templateUrl: './generic-object-manager.component.html',
  styleUrl: './generic-object-manager.component.css'
})
export class GenericObjectManagerComponent<T extends ObjectInSublocation> {

  @Input() genericObjectArray: T[] = [];
  @Input() key!: KeyInSublocation;
  @Input() objectToString: (a: T | undefined) => string = (obj : T | undefined) => "uninitialized name";
  @Output() objectDeleted = new EventEmitter<Pair<T, KeyInSublocation>>();


  deleteObject(pairOfObjectAndKey: Pair<T, KeyInSublocation>) {
    this.objectDeleted.emit(pairOfObjectAndKey)
  }

  protected readonly nameOf = nameOf;
}
