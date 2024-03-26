import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule} from "@angular/common";
import { SingleGenericObjectComponent } from "../single-generic-object/single-generic-object.component";
import {Pair} from "../Pair";
import {KeyInSublocation, nameOf} from "../KeyInSublocation";
import {ConnectionBuilderComponent} from "../connection-builder/connection-builder.component";
import {ObjectInSublocation} from "../ObjectInSublocation";
import {Connection} from "../map-management/connection";
import {ItemBuilderComponent} from "../item-builder/item-builder.component";
import {EnemyBuilderComponent} from "../enemy-builder/enemy-builder.component";

@Component({
  selector: 'sml-edit-generic-object-manager',
  standalone: true,
  imports: [CommonModule, SingleGenericObjectComponent, ConnectionBuilderComponent, ItemBuilderComponent, EnemyBuilderComponent],
  templateUrl: './generic-object-manager.component.html',
  styleUrl: './generic-object-manager.component.css'
})
export class GenericObjectManagerComponent<T extends ObjectInSublocation> {

  @Input() genericObjectArray: T[] = [];
  @Input() key!: KeyInSublocation;
  @Input() objectToString: (a: T | undefined) => string = (obj : T | undefined) => "uninitialized name";
  @Output() objectDeleted = new EventEmitter<Pair<T, KeyInSublocation>>();
  @Output() connectionCreated = new EventEmitter<Connection>();
  showingDetails: boolean = false;

  deleteObject(pairOfObjectAndKey: Pair<T, KeyInSublocation>) {
    this.objectDeleted.emit(pairOfObjectAndKey)
  }

  protected readonly nameOf = nameOf;

  createConnection(connection: Connection) {
    this.connectionCreated.emit(connection)
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails
  }
}
