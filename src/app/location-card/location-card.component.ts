import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GenericObjectManagerComponent} from "../generic-object-manager/generic-object-manager.component";
import {CommonModule} from "@angular/common";

import {Location} from "../map-management/location";
import {Enemy} from "../map-management/enemy";
import {Item} from "../map-management/item";
import {Connection} from "../map-management/connection";
import {OtherObject} from "../map-management/otherObject";
import {NPC} from "../map-management/NPC";
import {Pair} from "../Pair";
import {Triplet} from "../Triplet";
import {KeyInLocation} from "../KeyInLocation";
import {ObjectInLocation} from "../ObjectInLocation";
import {MapManagerService} from "../map-management/map-manager.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'sml-edit-location-card',
  standalone: true,
  imports: [
    CommonModule,
    GenericObjectManagerComponent,
    FormsModule
  ],
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.css'
})
export class LocationCardComponent {

  showingDetails: boolean = false;
  currentlyEditing: boolean = false;
  editedName: string = "";

  constructor(private mapService: MapManagerService) {
  }

  @Input() location!: Location;
  @Output() locationDeleted = new EventEmitter<Location>();
  @Output() objectDeletedFromLocation = new EventEmitter<Triplet<
    Location,
    ObjectInLocation,
    KeyInLocation
  >>();
  @Output() updateLocationWithIDToName = new EventEmitter<Pair<number, string>>
  @Output() connectionCreatedOrUpdatedFromLocation = new EventEmitter<Pair<Location, Connection>>();
  @Output() itemCreatedOrUpdatedInLocation = new EventEmitter<Pair<Location, Item>>();
  @Output() enemyCreatedOrUpdatedInLocation = new EventEmitter<Pair<Location, Enemy>>();
  @Output() objectCreatedOrUpdatedInLocation = new EventEmitter<Pair<Location, OtherObject>>();
  @Output() npcCreatedOrUpdatedInLocation = new EventEmitter<Pair<Location, NPC>>();

  fireLocationDeleted() {
    this.locationDeleted.emit(this.location)
  }

  toggleEditing() {
    if (this.currentlyEditing) {
      this.updateLocationWithIDToName.emit({
        first: this.location.id,
        second: this.editedName
      });
      this.location.name = this.editedName;
    } else {
      this.editedName = this.location.name;
    }
    this.currentlyEditing = !this.currentlyEditing;
  }

  protected readonly connectionToString: (connection: Connection | undefined) => string = (connection) => {return connection?.toString() ?? "undefined"};
  protected readonly itemToString: (item: Item | undefined) => string = (item) => {return item?.toString(this.mapService) ?? "undefined"};
  protected readonly enemyToString: (enemy: Enemy | undefined) => string = (enemy) => {return enemy?.toString() ?? "undefined"};
  protected readonly otherObjectToString: (object: OtherObject | undefined) => string = (object) => {return object?.toString() ?? "undefined"};
  protected readonly npcToString: (npc: NPC | undefined) => string = (npc) => {return npc?.toString() ?? "undefined"};

  deleteObject(pairOfObjectAndKey: Pair<ObjectInLocation, KeyInLocation>)
  {
    this.objectDeletedFromLocation.emit({
      first: this.location,
      second: pairOfObjectAndKey.first,
      third: pairOfObjectAndKey.second})
  }

  protected readonly KeyInLocation = KeyInLocation;

  registerOrUpdateNewConnection(theConnection: Connection) {
    this.connectionCreatedOrUpdatedFromLocation.emit({
      first: this.location,
      second: theConnection
    });
  }

  registerOrUpdateNewItem(theItem: Item) {
    this.itemCreatedOrUpdatedInLocation.emit({
      first: this.location,
      second: theItem
    });
  }
  registerOrUpdateNewEnemy(theEnemy: Enemy) {
    this.enemyCreatedOrUpdatedInLocation.emit({
      first: this.location,
      second: theEnemy
    });
  }

  registerOrUpdateNewObject(theObject: OtherObject) {
    this.objectCreatedOrUpdatedInLocation.emit({
      first: this.location,
      second: theObject
    });
  }

  registerOrUpdateNewNPC(theNPC: NPC) {
    this.npcCreatedOrUpdatedInLocation.emit({
      first: this.location,
      second: theNPC
    });
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails;
  }
}
