import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {SingleGenericObjectComponent} from "../../single-generic-object/single-generic-object.component";
import {NpcBuilderComponent} from "../../npc-builder/npc-builder.component";
import {NPC} from "../../map-management/NPC";
import {AbstractManager} from "../abstract-manager";

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
export class NpcManagerComponent extends AbstractManager {

  @Input() npcs: NPC[] = [];
  @Output() npcDeleted = new EventEmitter<NPC>();
  @Output() npcCreatedOrUpdated = new EventEmitter<NPC>();

  npcToEdit: NPC | undefined;

  edit(npc: NPC) {
    this.npcToEdit = npc;
  }

  delete(npc: NPC) {
    this.npcDeleted.emit(npc);
  }

  createOrUpdate(npc: NPC) {
    this.npcCreatedOrUpdated.emit(npc);
  }
}
