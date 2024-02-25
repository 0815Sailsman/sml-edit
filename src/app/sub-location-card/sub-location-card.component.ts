import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LocationInterface} from "../map-management/location.interface";
import {NgForOf} from "@angular/common";
import {MajorLocationInterface} from "../map-management/majorLocation.interface";

@Component({
  selector: 'sml-edit-sub-location-card',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './sub-location-card.component.html',
  styleUrl: './sub-location-card.component.css'
})
export class SubLocationCardComponent {

  @Input() location: LocationInterface | undefined;
  @Output() locationDeleted = new EventEmitter<LocationInterface>();

  fireLocationDeleted() {
    this.locationDeleted.emit(this.location)
  }
}
