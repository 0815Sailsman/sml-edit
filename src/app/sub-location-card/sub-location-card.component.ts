import {ApplicationRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {GenericObjectManagerComponent} from "../generic-object-manager/generic-object-manager.component";
import {CommonModule} from "@angular/common";

import {Location} from "../map-management/location";
import {Enemy, enemyToString} from "../map-management/enemy";
import {Item, itemToString} from "../map-management/item";
import {Connection, connectionToString} from "../map-management/connection";
import {OtherObject, otherObjectToString} from "../map-management/otherObject";
import {NPC, npcToString} from "../map-management/NPC";
import {Pair} from "../Pair";
import {Triplet} from "../Triplet";
import {KeyInSublocation} from "../KeyInSublocation";
import {ObjectInSublocation} from "../ObjectInSublocation";

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
  @Output() objectDeletedFromLocation = new EventEmitter<Triplet<
      Location,
      ObjectInSublocation,
      KeyInSublocation
    >>();
  @Output() connectionCreatedFromLocation = new EventEmitter<Pair<Location, Connection>>
  showingDetails: boolean = false;

  fireLocationDeleted() {
    this.locationDeleted.emit(this.location)
  }

  protected readonly itemToString: (item: Item | undefined) => string = itemToString;
  protected readonly connectionToString: (connection: Connection | undefined) => string = connectionToString;
  protected readonly enemyToString: (enemy: Enemy | undefined) => string = enemyToString;
  protected readonly otherObjectToString: (object: OtherObject | undefined) => string = otherObjectToString;
  protected readonly npcToString: (npc: NPC | undefined) => string = npcToString;

  deleteObject(pairOfObjectAndKey: Pair<ObjectInSublocation, KeyInSublocation>)
  {
    this.objectDeletedFromLocation.emit({
      first: this.location,
      second: pairOfObjectAndKey.first,
      third: pairOfObjectAndKey.second})
  }

  protected readonly KeyInSublocation = KeyInSublocation;

  registerNewConnection(theConnection: Connection) {
    this.connectionCreatedFromLocation.emit({
      first: this.location,
      second: theConnection
    })
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails
  }
}
