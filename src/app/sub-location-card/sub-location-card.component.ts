import {Component, Input} from '@angular/core';
import {LocationInterface} from "../map-management/location.interface";
import {NgForOf} from "@angular/common";

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

}
