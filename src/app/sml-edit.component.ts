import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AbstractMapLoaderService } from "./map-management/loader/abstract-map-loader.service";
import { MajorLocationCardComponent } from "./major-location-card/major-location-card.component";
import {MajorLocationInterface} from "./map-management/majorLocation.interface";
import {FormsModule} from "@angular/forms";
import {MapManagerService} from "./map-management/map-manager.service";

@Component({
  selector: 'sml-edit-root',
  standalone: true,
  imports: [RouterOutlet, MajorLocationCardComponent, CommonModule, FormsModule],
  templateUrl: './sml-edit.component.html',
  styleUrl: './sml-edit.component.css'
})
export class SmlEditComponent {

  constructor(protected mapService: MapManagerService) {}

  newLocationName: string | undefined;

  deleteMajorLocation(theLocation: MajorLocationInterface) {
    this.mapService.deleteMajorLocation(theLocation)
  }

  addMajorLocation(theName: string | undefined) {
    if (theName != undefined && theName != "") {
      this.mapService.addMajorLocationWithName(theName)
      this.newLocationName = ""
    }
  }
}
