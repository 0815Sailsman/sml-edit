import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Area} from "../map-management/area";
import {LocationCardComponent} from "../location-card/location-card.component";
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
import {ObjectInLocation} from "../ObjectInLocation";
import {KeyInLocation} from "../KeyInLocation";

@Component({
  selector: 'sml-edit-area-card',
  standalone: true,
  imports: [
    LocationCardComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './area-card.component.html',
  styleUrl: './area-card.component.css'
})
export class AreaCardComponent {

  newAreaName: string | undefined;
  currentlyEditing: boolean = false;
  editedName: string = "";

  constructor(private mapService: MapManagerService) {}

  @Input() area!: Area;
  @Output() areaDeleted = new EventEmitter<Area>();

  fireAreaDeleted() {
    this.areaDeleted.emit(this.area)
  }

  toggleEditing() {
    if (this.currentlyEditing) {
      this.mapService.updateAreaWithIDToName(this.area?.id, this.editedName);
      this.area.name = this.editedName;
    } else {
      this.editedName = this.area?.name;
    }
    this.currentlyEditing = !this.currentlyEditing;
  }

  addLocation(theName: string | undefined) {
    if (theName != undefined && theName != "" && this.area != undefined) {
      this.mapService.addLocationTo(this.area, theName)
      this.newAreaName = ""
    }
  }

  updateLocationWithIDToName(pairOfIdAndName: Pair<number, string>) {
    this.mapService.updateLocationWithIDToName(this.area, pairOfIdAndName.first, pairOfIdAndName.second);
  }

  deleteLocation(theLocationToBeDeleted: Location) {
    if (this.area != undefined) {
      this.mapService.deleteLocationFrom(this.area, theLocationToBeDeleted)
    }
  }

  deleteObjectFromLocation(
    tripletOfLocationAndObjectAndKey: Triplet<Location, ObjectInLocation, KeyInLocation>
  ): void {
    this.mapService.deleteGeneralObjectFromLocationInArea(
      this.area,
      tripletOfLocationAndObjectAndKey.first,
      tripletOfLocationAndObjectAndKey.second,
      tripletOfLocationAndObjectAndKey.third
    )
  }

  deleteConnectionFromLocation(
    tripletOfLocationAndObjectAndKey: Pair<Location, Connection>
  ): void {
    this.mapService.deleteConnectionFromLocationInArea(
      this.area,
      tripletOfLocationAndObjectAndKey.first,
      tripletOfLocationAndObjectAndKey.second,
    )
  }

  createOrUpdateConnectionFromLocation(pairOfLocationAndConnection: Pair<Location, Connection>) {
    this.mapService.createOrUpdateConnectionFromLocation(
      this.area,
      pairOfLocationAndConnection.first,
      pairOfLocationAndConnection.second
    )
  }

  createOrUpdateItemInLocation(pairOfLocationAndItem: Pair<Location, Item>) {
    this.mapService.createOrUpdateItemInLocation(
      this.area,
      pairOfLocationAndItem.first,
      pairOfLocationAndItem.second
      )
  }

  createOrUpdateEnemyInLocation(pairOfLocationAndEnemy: Pair<Location, Enemy>) {
    this.mapService.createOrUpdateEnemyInLocation(
      this.area,
      pairOfLocationAndEnemy.first,
      pairOfLocationAndEnemy.second
      );
  }

  createOrUpdateObjectInLocation(pairOfLocationAndObject: Pair<Location, OtherObject>) {
    this.mapService.createOrUpdateObjectInLocation(
      this.area,
      pairOfLocationAndObject.first,
      pairOfLocationAndObject.second
    );
  }

  createOrUpdateNPCInLocation(pairOfLocationAndNPC: Pair<Location, NPC>) {
    this.mapService.createOrUpdateNPCInLocation(
      this.area,
      pairOfLocationAndNPC.first,
      pairOfLocationAndNPC.second
    );
  }
}
