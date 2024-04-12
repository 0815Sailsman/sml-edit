import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Connection} from "../map-management/connection";
import {KeyInLocation} from "../KeyInLocation";
import {ConnectionBuilderComponent} from "../connection-builder/connection-builder.component";
import {EnemyBuilderComponent} from "../enemy-builder/enemy-builder.component";
import {ItemBuilderComponent} from "../item-builder/item-builder.component";
import {NgForOf, NgIf, NgSwitchCase} from "@angular/common";
import {NpcBuilderComponent} from "../npc-builder/npc-builder.component";
import {ObjectBuilderComponent} from "../object-builder/object-builder.component";
import {SingleGenericObjectComponent} from "../single-generic-object/single-generic-object.component";
import {AtomicCondition} from "../map-management/atomicCondition";

@Component({
  selector: 'sml-edit-connection-manager',
  standalone: true,
  imports: [
    ConnectionBuilderComponent,
    EnemyBuilderComponent,
    ItemBuilderComponent,
    NgIf,
    NgSwitchCase,
    NpcBuilderComponent,
    ObjectBuilderComponent,
    SingleGenericObjectComponent,
    NgForOf
  ],
  templateUrl: './connection-manager.component.html',
  styleUrl: './connection-manager.component.css'
})
export class ConnectionManagerComponent {

  @Input() connections: Connection[] = [];
  @Output() connectionDeleted = new EventEmitter<Connection>();
  @Output() connectionCreatedOrUpdated = new EventEmitter<Connection>();

  showingDetails: boolean = false;
  connectionToEdit: Connection | undefined;

  editConnection(connection: Connection) {
    this.connectionToEdit = connection;
  }

  deleteConnection(connection: Connection) {
    this.connectionDeleted.emit(connection);
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails
  }

  createOrUpdateConnection(connection: Connection) {
    this.connectionCreatedOrUpdated.emit(connection)
  }

  // todo these are duplicate in every manager! reduce to one location!
  extractConditions(connections: Connection[]): AtomicCondition[] {
    const conditionsWithDuplicates = connections
      .flatMap(connection => connection.availableIf?.subConditions ?? []);
    return this.filterDuplicateConditions(conditionsWithDuplicates);
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
