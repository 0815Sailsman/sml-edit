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
import {Item} from "../map-management/item";
import {Enemy} from "../map-management/enemy";
import {ObjectBuilderComponent} from "../object-builder/object-builder.component";
import {OtherObject} from "../map-management/otherObject";
import {NpcBuilderComponent} from "../npc-builder/npc-builder.component";
import {NPC} from "../map-management/NPC";

@Component({
  selector: 'sml-edit-generic-object-manager',
  standalone: true,
  imports: [CommonModule, SingleGenericObjectComponent, ConnectionBuilderComponent, ItemBuilderComponent, EnemyBuilderComponent, ObjectBuilderComponent, NpcBuilderComponent],
  templateUrl: './generic-object-manager.component.html',
  styleUrl: './generic-object-manager.component.css'
})
export class GenericObjectManagerComponent<T extends ObjectInSublocation> {

  @Input() genericObjectArray: T[] = [];
  @Input() key!: KeyInSublocation;
  @Input() objectToString: (a: T | undefined) => string = (obj : T | undefined) => "uninitialized name";
  @Output() objectDeleted = new EventEmitter<Pair<T, KeyInSublocation>>();
  @Output() connectionCreated = new EventEmitter<Connection>();
  @Output() itemCreated = new EventEmitter<Item>();
  @Output() enemyCreated = new EventEmitter<Enemy>();
  @Output() otherObjectCreated = new EventEmitter<OtherObject>();
  @Output() npcCreated = new EventEmitter<NPC>();
  showingDetails: boolean = false;

  deleteObject(pairOfObjectAndKey: Pair<T, KeyInSublocation>) {
    this.objectDeleted.emit(pairOfObjectAndKey)
  }

  protected readonly nameOf = nameOf;

  createConnection(connection: Connection) {
    this.connectionCreated.emit(connection)
  }

  createItem(item: Item) {
    this.itemCreated.emit(item)
  }

  createEnemy(enemy: Enemy) {
    this.enemyCreated.emit(enemy);
  }

  createOtherObject(object: OtherObject) {
    this.otherObjectCreated.emit(object)
  }

  createNPC(npc: NPC) {
    this.npcCreated.emit(npc)
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails
  }
}
