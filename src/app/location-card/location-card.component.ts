import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

import {Location} from "../model/location";
import {KeyInLocation} from "../model/KeyInLocation";
import {ObjectInLocation} from "../model/ObjectInLocation";
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
  @Output() updateLocationWithIDToName = new EventEmitter<{locationID: number, name: string}>
  @Output() locationDeleted = new EventEmitter<Location>();

  @Output() objectCreatedOrUpdatedFromLocation = new EventEmitter<{location: Location, object: ObjectInLocation, key: KeyInLocation}>
  @Output() objectDeletedFromLocation = new EventEmitter<{location: Location, object: ObjectInLocation, key: KeyInLocation}>;

  fireLocationDeleted() {
    this.locationDeleted.emit(this.location)
  }

  toggleEditing() {
    if (this.currentlyEditing) {
      this.updateLocationWithIDToName.emit({
        locationID: this.location.id,
        name: this.editedName
      });
      this.location.name = this.editedName;
    } else {
      this.editedName = this.location.name;
    }
    this.currentlyEditing = !this.currentlyEditing;
  }
  deleteConnection(connection: ObjectInLocation) {
    this.objectDeletedFromLocation.emit({
      location: this.location,
      object: connection,
      key: KeyInLocation.Connections
    });
  }

  deleteItem(item: ObjectInLocation) {
    this.objectDeletedFromLocation.emit({
      location: this.location,
      object: item,
      key: KeyInLocation.Items
    });
  }

  deleteEnemy(enemy: ObjectInLocation) {
    this.objectDeletedFromLocation.emit({
      location: this.location,
      object: enemy,
      key: KeyInLocation.Enemies
    })
  };

  deleteObject(object: ObjectInLocation) {
    this.objectDeletedFromLocation.emit({
      location: this.location,
      object: object,
      key: KeyInLocation.Objects
    });
  }

  deleteNPC(npc: ObjectInLocation) {
    this.objectDeletedFromLocation.emit({
      location: this.location,
      object: npc,
      key: KeyInLocation.Npcs
    });
  }

  protected readonly KeyInLocation = KeyInLocation;


  registerOrUpdateNewConnection(connection: ObjectInLocation) {
    this.objectCreatedOrUpdatedFromLocation.emit({
      location: this.location,
      object: connection,
      key: KeyInLocation.Connections
    });
  }

  registerOrUpdateNewItem(item: ObjectInLocation) {
    this.objectCreatedOrUpdatedFromLocation.emit({
      location: this.location,
      object: item,
      key: KeyInLocation.Items
    });
  }
  registerOrUpdateNewEnemy(enemy: ObjectInLocation) {
    this.objectCreatedOrUpdatedFromLocation.emit({
      location: this.location,
      object: enemy,
      key: KeyInLocation.Enemies
    });
  }

  registerOrUpdateNewObject(object: ObjectInLocation) {
    this.objectCreatedOrUpdatedFromLocation.emit({
      location: this.location,
      object: object,
      key: KeyInLocation.Objects
    });
  }

  registerOrUpdateNewNPC(npc: ObjectInLocation) {
    this.objectCreatedOrUpdatedFromLocation.emit({
      location: this.location,
      object: npc,
      key: KeyInLocation.Npcs
    });
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails;
  }
}
