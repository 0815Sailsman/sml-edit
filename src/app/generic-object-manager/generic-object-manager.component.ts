import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SingleGenericObjectComponent} from "../single-generic-object/single-generic-object.component";
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
import {AtomicCondition} from "../map-management/atomicCondition";

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
  @Output() connectionCreatedOrUpdated = new EventEmitter<Connection>();
  @Output() itemCreatedOrUpdated = new EventEmitter<Item>();
  @Output() enemyCreatedOrUpdated = new EventEmitter<Enemy>();
  @Output() otherObjectCreatedOrUpdated = new EventEmitter<OtherObject>();
  @Output() npcCreatedOrUpdated = new EventEmitter<NPC>();

  showingDetails: boolean = false;

  connectionToEdit: Connection | undefined;
  itemToEdit: Item | undefined;
  enemyToEdit: Enemy | undefined;
  otherObjectToEdit: OtherObject | undefined;
  npcToEdit: NPC | undefined;

  protected readonly nameOf = nameOf;

  editObject(pairOfObjectAndKey: Pair<T, KeyInSublocation>) {
    switch (pairOfObjectAndKey.second) {
      case KeyInSublocation.Connections: {this.connectionToEdit = pairOfObjectAndKey.first as Connection;break;}
      case KeyInSublocation.Items: {this.itemToEdit = pairOfObjectAndKey.first as Item;break;}
      case KeyInSublocation.Enemies: {this.enemyToEdit = pairOfObjectAndKey.first as Enemy;break;}
      case KeyInSublocation.Objects: {this.otherObjectToEdit = pairOfObjectAndKey.first as OtherObject;break;}
      case KeyInSublocation.Npcs: {this.npcToEdit = pairOfObjectAndKey.first as NPC;break;}
    }
  }

  deleteObject(pairOfObjectAndKey: Pair<T, KeyInSublocation>) {
    this.objectDeleted.emit(pairOfObjectAndKey)
  }

  createOrUpdateConnection(connection: Connection) {
    this.connectionCreatedOrUpdated.emit(connection)
  }

  createOrUpdateItem(item: Item) {
    this.itemCreatedOrUpdated.emit(item)
  }

  createOrUpdateEnemy(enemy: Enemy) {
    this.enemyCreatedOrUpdated.emit(enemy);
  }

  createOrUpdateOtherObject(object: OtherObject) {
    this.otherObjectCreatedOrUpdated.emit(object)
  }

  createOrUpdateNPC(npc: NPC) {
    this.npcCreatedOrUpdated.emit(npc)
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails
  }

  extractConditions(genericObjectArray: T[]): AtomicCondition[] {
    const conditionsWithDuplicates =  genericObjectArray
      .flatMap(genObj => genObj.if?.subConditions ?? []);
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
}
