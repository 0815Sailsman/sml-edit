import {ApplicationRef, Component, EventEmitter, Input, Output} from '@angular/core';
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

  constructor(
    private mapService: MapManagerService,
    private app: ApplicationRef
    ) {}

  @Input() majorLocation: MajorLocation | undefined;
  @Output() locationDeleted = new EventEmitter<MajorLocation>();
  newLocationName: string | undefined;

  fireLocationDeleted() {
    this.locationDeleted.emit(this.majorLocation)
  }


  addSubLocation(theName: string | undefined) {
    if (theName != undefined && theName != "" && this.majorLocation != undefined) {
      this.mapService.addMinorLocationTo(this.majorLocation, theName)
      this.newLocationName = ""
      this.app.tick()
    }
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

  createConnectionFromLocation(pairOfLocationAndConnection: Pair<Location, Connection>) {
    this.mapService.createConnectionFromLocation(this.majorLocation,
      pairOfLocationAndConnection.first,
      pairOfLocationAndConnection.second
    )
  }

  createItemInLocation(pairOfLocationAndItem: Pair<Location, Item>) {
    this.mapService.createItemInLocation(this.majorLocation,
      pairOfLocationAndItem.first,
      pairOfLocationAndItem.second
      )
  }
}
