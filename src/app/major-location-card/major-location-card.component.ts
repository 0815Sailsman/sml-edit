import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MajorLocationInterface} from "../map-management/majorLocation.interface";
import {SubLocationCardComponent} from "../sub-location-card/sub-location-card.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {MapManagerService} from "../map-management/map-manager.service";
import {LocationInterface} from "../map-management/location.interface";

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

  constructor(private mapService: MapManagerService) {}

  @Input() majorLocation: MajorLocationInterface | undefined;
  @Output() locationDeleted = new EventEmitter<MajorLocationInterface>();
  showingDetails: boolean = false;
  newLocationName: string | undefined;

  fireLocationDeleted() {
    this.locationDeleted.emit(this.majorLocation)
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails
  }

  addSubLocation(theName: string | undefined) {
    if (theName != undefined && theName != "" && this.majorLocation != undefined) {
      this.mapService.addMinorLocationTo(this.majorLocation, theName)
      this.newLocationName = ""
    }
  }

  deleteSubLocation(theLocationToBeDeleted: LocationInterface) {
    if (this.majorLocation != undefined) {
      this.mapService.deleteSubLocationFrom(this.majorLocation, theLocationToBeDeleted)
    }
  }
}
