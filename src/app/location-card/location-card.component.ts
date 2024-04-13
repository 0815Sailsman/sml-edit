import {Component, EventEmitter, Input, Output} from '@angular/core';
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
import {ConnectionManagerComponent} from "../managers/connection-manager/connection-manager.component";
import {ItemManagerComponent} from "../managers/item-manager/item-manager.component";
import {EnemyManagerComponent} from "../managers/enemy-manager/enemy-manager.component";
import {OtherObjectManagerComponent} from "../managers/other-object-manager/other-object-manager.component";
import {NpcManagerComponent} from "../managers/npc-manager/npc-manager.component";

@Component({
  selector: 'sml-edit-location-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ConnectionManagerComponent,
    ItemManagerComponent,
    EnemyManagerComponent,
    OtherObjectManagerComponent,
    NpcManagerComponent
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
  @Output() connectionDeletedFromLocation = new EventEmitter<{location: Location, connection: Connection}>();
  @Output() itemDeletedFromLocation = new EventEmitter<{location: Location, item: Item}>();
  @Output() enemyDeletedFromLocation = new EventEmitter<{location: Location, enemy: Enemy}>();
  @Output() otherObjectDeletedFromLocation = new EventEmitter<{location: Location, object: OtherObject}>();
  @Output() npcDeletedFromLocation = new EventEmitter<{location: Location, npc: NPC}>();

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
  deleteConnection(connection: Connection) {
    this.connectionDeletedFromLocation.emit({
      location: this.location,
      connection: connection
    });
  }

  deleteItem(item: Item) {
    this.itemDeletedFromLocation.emit({
      location: this.location,
      item: item
    });
  }

  deleteEnemy(enemy: Enemy) {
    this.enemyDeletedFromLocation.emit({
      location: this.location,
      enemy: enemy
    })
  };

  deleteObject(object: OtherObject) {
    this.otherObjectDeletedFromLocation.emit({
      location: this.location,
      object: object
    });
  }

  deleteNPC(npc: NPC) {
    this.npcDeletedFromLocation.emit({
      location: this.location,
      npc: npc
    });
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
