import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MajorLocationInterface} from "../map-management/majorLocation.interface";
import {SubLocationCardComponent} from "../sub-location-card/sub-location-card.component";
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sml-edit-major-location-card',
  standalone: true,
  imports: [
    SubLocationCardComponent,
    CommonModule
  ],
  templateUrl: './major-location-card.component.html',
  styleUrl: './major-location-card.component.css'
})
export class MajorLocationCardComponent {

  @Input() majorLocation: MajorLocationInterface | undefined;
  @Output() locationDeleted = new EventEmitter<MajorLocationInterface>();
  showingDetails: boolean = false;

  fireLocationDeleted() {
    this.locationDeleted.emit(this.majorLocation)
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails
  }
}
