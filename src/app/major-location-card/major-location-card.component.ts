import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MajorLocation} from "../map-management/majorLocation";
import {SubLocationCardComponent} from "../sub-location-card/sub-location-card.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {MapManagerService} from "../map-management/map-manager.service";
import {Location} from "../map-management/location";
import {Pair} from "../Pair";
import {Item} from "../map-management/item";
import {Triplet} from "../Triplet";
import {Connection} from "../map-management/connection";
import {Enemy} from "../map-management/enemy";
import {NPC} from "../map-management/NPC";
import {OtherObject} from "../map-management/otherObject";
import {ObjectInSublocation} from "../ObjectInSublocation";
import {KeyInSublocation} from "../KeyInSublocation";

@Component({
  selector: 'sml-edit-major-location-card',
  standalone: true,
  imports: [
    SubLocationCardComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './major-location-card.component.html',
  styleUrl: './major-location-card.component.css'
})
export class MajorLocationCardComponent {

  newLocationName: string | undefined;
  currentlyEditing: boolean = false;
  editedName: string = "";

  constructor(private mapService: MapManagerService) {}

  @Input() majorLocation!: MajorLocation;
  @Output() locationDeleted = new EventEmitter<MajorLocation>();

  fireLocationDeleted() {
    this.locationDeleted.emit(this.majorLocation)
  }

  toggleEditing() {
    if (this.currentlyEditing) {
      this.mapService.updateMajorLocationWithIDToName(this.majorLocation?.id, this.editedName);
      this.majorLocation.name = this.editedName;
    } else {
      this.editedName = this.majorLocation?.name;
    }
    this.currentlyEditing = !this.currentlyEditing;
  }

  addSubLocation(theName: string | undefined) {
    if (theName != undefined && theName != "" && this.majorLocation != undefined) {
      this.mapService.addMinorLocationTo(this.majorLocation, theName)
      this.newLocationName = ""
    }
  }

  updateMinorLocationWithIDToName(pairOfIdAndName: Pair<number, string>) {
    this.mapService.updateMinorLocationWithIDToName(this.majorLocation, pairOfIdAndName.first, pairOfIdAndName.second);
  }

  deleteSubLocation(theLocationToBeDeleted: Location) {
    if (this.majorLocation != undefined) {
      this.mapService.deleteSubLocationFrom(this.majorLocation, theLocationToBeDeleted)
    }
  }

  deleteObjectFromLocation(
    tripletOfLocationAndObjectAndKey: Triplet<Location, ObjectInSublocation, KeyInSublocation>
  ): void {
    this.mapService.deleteGeneralObjectFromLocationInMajorLocation(
      this.majorLocation,
      tripletOfLocationAndObjectAndKey.first,
      tripletOfLocationAndObjectAndKey.second,
      tripletOfLocationAndObjectAndKey.third
    )
  }

  createOrUpdateConnectionFromLocation(pairOfLocationAndConnection: Pair<Location, Connection>) {
    this.mapService.createOrUpdateConnectionFromLocation(
      this.majorLocation,
      pairOfLocationAndConnection.first,
      pairOfLocationAndConnection.second
    )
  }

  createOrUpdateItemInLocation(pairOfLocationAndItem: Pair<Location, Item>) {
    this.mapService.createOrUpdateItemInLocation(
      this.majorLocation,
      pairOfLocationAndItem.first,
      pairOfLocationAndItem.second
      )
  }

  createEnemyInLocation(pairOfLocationAndEnemy: Pair<Location, Enemy>) {
    this.mapService.createEnemyInLocation(
      this.majorLocation,
      pairOfLocationAndEnemy.first,
      pairOfLocationAndEnemy.second
      );
  }

  createObjectInLocation(pairOfLocationAndObject: Pair<Location, OtherObject>) {
    this.mapService.createObjectInLocation(
      this.majorLocation,
      pairOfLocationAndObject.first,
      pairOfLocationAndObject.second
    );
  }

  createNPCInLocation(pairOfLocationAndNPC: Pair<Location, NPC>) {
    this.mapService.createNPCInLocation(
      this.majorLocation,
      pairOfLocationAndNPC.first,
      pairOfLocationAndNPC.second
    );
  }
}
