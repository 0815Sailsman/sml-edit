import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {SingleGenericObjectComponent} from "../../single-generic-object/single-generic-object.component";
import {NpcBuilderComponent} from "../../builders/npc-builder/npc-builder.component";
import {NPC} from "../../model/NPC";
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

  override objectToEdit: NPC | undefined;

}
