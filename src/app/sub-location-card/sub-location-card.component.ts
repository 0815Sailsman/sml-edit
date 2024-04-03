import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GenericObjectManagerComponent} from "../generic-object-manager/generic-object-manager.component";
import {CommonModule} from "@angular/common";

import {Location} from "../map-management/location";
import {Enemy, enemyToString} from "../map-management/enemy";
import {Item} from "../map-management/item";
import {Connection, connectionToString} from "../map-management/connection";
import {OtherObject, otherObjectToString} from "../map-management/otherObject";
import {NPC, npcToString} from "../map-management/NPC";
import {Pair} from "../Pair";
import {Triplet} from "../Triplet";
import {KeyInSublocation} from "../KeyInSublocation";
import {ObjectInSublocation} from "../ObjectInSublocation";
import {MapManagerService} from "../map-management/map-manager.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'sml-edit-sub-location-card',
  standalone: true,
  imports: [
    CommonModule,
    GenericObjectManagerComponent,
    FormsModule
  ],
  templateUrl: './sub-location-card.component.html',
  styleUrl: './sub-location-card.component.css'
})
export class SubLocationCardComponent {

  showingDetails: boolean = false;
  currentlyEditing: boolean = false;
  editedName: string = "";

  constructor(private mapService: MapManagerService) {
  }

  @Input() location!: Location;
  @Output() locationDeleted = new EventEmitter<Location>();
  @Output() objectDeletedFromLocation = new EventEmitter<Triplet<
    Location,
    ObjectInSublocation,
    KeyInSublocation
  >>();
  @Output() connectionCreatedFromLocation = new EventEmitter<Pair<Location, Connection>>();
  @Output() updateConnectionFromLocation = new EventEmitter<Pair<Location, Connection>>();
  @Output() itemCreatedInLocation = new EventEmitter<Pair<Location, Item>>();
  @Output() updateItemInLocation = new EventEmitter<Pair<Location, Item>>();
  @Output() enemyCreatedInLocation = new EventEmitter<Pair<Location, Enemy>>();
  @Output() objectCreatedInLocation = new EventEmitter<Pair<Location, OtherObject>>();
  @Output() npcCreatedInLocation = new EventEmitter<Pair<Location, NPC>>();

  fireLocationDeleted() {
    this.locationDeleted.emit(this.location)
  }

  toggleEditing() {
    if (this.currentlyEditing) {
      this.mapService.updateMinorLocationWithIDToName(this.location.id, this.editedName);
      this.location.name = this.editedName;
    } else {
      this.editedName = this.location.name;
    }
    this.currentlyEditing = !this.currentlyEditing;
  }

  protected readonly itemToString: (item: Item | undefined) => string = (item) => {return this.mapService.itemToString(item)};
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
    });
  }

  updateConnection(theConnection: Connection) {
    this.updateConnectionFromLocation.emit({
      first: this.location,
      second: theConnection
    });
  }

  registerNewItem(theItem: Item) {
    this.itemCreatedInLocation.emit({
      first: this.location,
      second: theItem
    });
  }

  updateItem(theItem: Item) {
    this.updateItemInLocation.emit({
      first: this.location,
      second: theItem
    });
  }

  registerNewEnemy(theEnemy: Enemy) {
    this.enemyCreatedInLocation.emit({
      first: this.location,
      second: theEnemy
    });
  }

  registerNewObject(theObject: OtherObject) {
    this.objectCreatedInLocation.emit({
      first: this.location,
      second: theObject
    });
  }

  registerNewNPC(theNPC: NPC) {
    this.npcCreatedInLocation.emit({
      first: this.location,
      second: theNPC
    });
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails;
  }
}
