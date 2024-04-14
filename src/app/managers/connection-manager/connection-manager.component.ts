import {Component} from '@angular/core';
import {Connection} from "../../model/connection";
import {ConnectionBuilderComponent} from "../../builders/connection-builder/connection-builder.component";
import {EnemyBuilderComponent} from "../../builders/enemy-builder/enemy-builder.component";
import {ItemBuilderComponent} from "../../builders/item-builder/item-builder.component";
import {NgForOf, NgIf, NgSwitchCase} from "@angular/common";
import {NpcBuilderComponent} from "../../builders/npc-builder/npc-builder.component";
import {ObjectBuilderComponent} from "../../builders/object-builder/object-builder.component";
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

  override objectToEdit: Connection | undefined;

}
