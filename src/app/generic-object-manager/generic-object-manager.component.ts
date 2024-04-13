import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SingleGenericObjectComponent} from "../single-generic-object/single-generic-object.component";
import {Pair} from "../Pair";
import {KeyInLocation, nameOf} from "../KeyInLocation";
import {ConnectionBuilderComponent} from "../connection-builder/connection-builder.component";
import {ObjectInLocation} from "../ObjectInLocation";
import {ItemBuilderComponent} from "../item-builder/item-builder.component";
import {EnemyBuilderComponent} from "../enemy-builder/enemy-builder.component";
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
export class GenericObjectManagerComponent<T extends ObjectInLocation> {

  @Input() genericObjectArray: T[] = [];
  @Input() key!: KeyInLocation;
  @Output() objectDeleted = new EventEmitter<Pair<T, KeyInLocation>>();
  @Output() npcCreatedOrUpdated = new EventEmitter<NPC>();

  showingDetails: boolean = false;

  npcToEdit: NPC | undefined;

  protected readonly nameOf = nameOf;

  editObject(pairOfObjectAndKey: Pair<T, KeyInLocation>) {
    switch (pairOfObjectAndKey.second) {
      case KeyInLocation.Npcs: {this.npcToEdit = pairOfObjectAndKey.first as NPC;break;}
    }
  }

  deleteObject(pairOfObjectAndKey: Pair<T, KeyInLocation>) {
    this.objectDeleted.emit(pairOfObjectAndKey)
  }

  createOrUpdateNPC(npc: NPC) {
    this.npcCreatedOrUpdated.emit(npc)
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails
  }

  extractConditions(genericObjectArray: T[]): AtomicCondition[] {
    const conditionsWithDuplicates =  genericObjectArray
      .flatMap(genObj => genObj.availableIf?.subConditions ?? []);
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
