import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MapLoaderService } from "./map-management/map-loader.service";
import { MajorLocationCardComponent } from "./major-location-card/major-location-card.component";
import {MajorLocationInterface} from "./map-management/majorLocation.interface";
import {FormsModule} from "@angular/forms";
import {MapManagerService} from "./map-management/map-manager.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MajorLocationCardComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

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
