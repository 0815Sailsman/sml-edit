import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {SingleGenericObjectComponent} from "../single-generic-object/single-generic-object.component";
import {KeyInLocation} from "../KeyInLocation";
import {NpcBuilderComponent} from "../npc-builder/npc-builder.component";
import {NPC} from "../map-management/NPC";
import {OtherObject} from "../map-management/otherObject";
import {AtomicCondition} from "../map-management/atomicCondition";

@Component({
  selector: 'sml-edit-npc-manager',
  standalone: true,
  imports: [
    NgIf,
    SingleGenericObjectComponent,
    NgForOf,
    NpcBuilderComponent
  ],
  templateUrl: './npc-manager.component.html',
  styleUrl: './npc-manager.component.css'
})
export class NpcManagerComponent {

  @Input() npcs: NPC[] = [];
  @Output() npcDeleted = new EventEmitter<NPC>();
  @Output() npcCreatedOrUpdated = new EventEmitter<NPC>();

  showingDetails: boolean = false;
  npcToEdit: NPC | undefined;

  editNPC(npc: NPC) {
    this.npcToEdit = npc;
  }

  deleteNPC(npc: NPC) {
    this.npcDeleted.emit(npc);
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails;
  }

  createOrUpdateNPC(npc: NPC) {
    this.npcCreatedOrUpdated.emit(npc);
  }

  // todo these are duplicate in every manager! reduce to one location!
  extractConditions(npc: NPC[]): AtomicCondition[] {
    const npcsWithDuplicates = npc
      .flatMap(oldNPC => oldNPC.availableIf?.subConditions ?? []);
    return this.filterDuplicateConditions(npcsWithDuplicates);
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
