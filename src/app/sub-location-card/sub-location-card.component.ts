import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GenericObjectManagerComponent} from "../generic-object-manager/generic-object-manager.component";
import {CommonModule} from "@angular/common";

import {Location} from "../map-management/location";
import {Enemy, enemyToString} from "../map-management/enemy";
import {Item, itemToString} from "../map-management/item";
import {Connection, connectionToString} from "../map-management/connection";
import {OtherObject, otherObjectToString} from "../map-management/otherObject";
import {NPC, npcToString} from "../map-management/NPC";

@Component({
  selector: 'sml-edit-sub-location-card',
  standalone: true,
  imports: [
    CommonModule,
    GenericObjectManagerComponent
  ],
  templateUrl: './sub-location-card.component.html',
  styleUrl: './sub-location-card.component.css'
})
export class SubLocationCardComponent {

  @Input() location: Location | undefined;
  @Output() locationDeleted = new EventEmitter<Location>();

  fireLocationDeleted() {
    this.locationDeleted.emit(this.location)
  }

  protected readonly itemToString: (item: Item | undefined) => string = itemToString;
  protected readonly connectionToString: (connection: Connection | undefined) => string = connectionToString;
  protected readonly enemyToString: (enemy: Enemy | undefined) => string = enemyToString;
  protected readonly otherObjectToString: (object: OtherObject | undefined) => string = otherObjectToString;
  protected readonly npcToString: (npc: NPC | undefined) => string = npcToString;
}
