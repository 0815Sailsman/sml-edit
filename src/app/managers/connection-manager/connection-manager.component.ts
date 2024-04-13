import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Connection} from "../../map-management/connection";
import {ConnectionBuilderComponent} from "../../connection-builder/connection-builder.component";
import {EnemyBuilderComponent} from "../../enemy-builder/enemy-builder.component";
import {ItemBuilderComponent} from "../../item-builder/item-builder.component";
import {NgForOf, NgIf, NgSwitchCase} from "@angular/common";
import {NpcBuilderComponent} from "../../npc-builder/npc-builder.component";
import {ObjectBuilderComponent} from "../../object-builder/object-builder.component";
import {SingleGenericObjectComponent} from "../../single-generic-object/single-generic-object.component";
import {AbstractManager} from "../abstract-manager";

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
export class ConnectionManagerComponent extends AbstractManager {

  @Input() connections: Connection[] = [];
  @Output() connectionDeleted = new EventEmitter<Connection>();
  @Output() connectionCreatedOrUpdated = new EventEmitter<Connection>();

  connectionToEdit: Connection | undefined;

  edit(connection: Connection) {
    this.connectionToEdit = connection;
  }

  delete(connection: Connection) {
    this.connectionDeleted.emit(connection);
  }

  createOrUpdate(connection: Connection) {
    this.connectionCreatedOrUpdated.emit(connection)
  }
}
