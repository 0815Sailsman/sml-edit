import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Area} from "../model/area";
import {LocationCardComponent} from "../location-card/location-card.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {MapManagerService} from "../map-management/map-manager.service";
import {Location} from "../model/location";
import {ObjectInLocation} from "../model/ObjectInLocation";
import {KeyInLocation} from "../model/KeyInLocation";

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

  updateLocationWithIDToName(params: {locationID: number, name: string}) {
    this.mapService.updateLocationWithIDToName(this.area, params.locationID, params.name);
  }

  deleteLocation(theLocationToBeDeleted: Location) {
    if (this.area != undefined) {
      this.mapService.deleteLocationFrom(this.area, theLocationToBeDeleted)
    }
  }

  deleteObjectFromLocation(
    params: {location: Location, object: ObjectInLocation, key: KeyInLocation}
  ): void {
    this.mapService.deleteGeneralObjectFromLocationInArea(
      this.area,
      params.location,
      params.object,
      params.key
    );
  }

  createOrUpdateObjectInLocation(
    params: {location: Location, object: ObjectInLocation, key: KeyInLocation}
  ): void {
    this.mapService.createOrUpdateGeneralObjectFromLocationInArea(
      this.area,
      params.location,
      params.object,
      params.key
    );
  }
}
