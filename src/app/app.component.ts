import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MapLoaderService } from "./map-loader.service";
import { MajorLocationCardComponent } from "./major-location-card/major-location-card.component";
import {MajorLocation} from "./majorLocation";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MajorLocationCardComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private mapService: MapLoaderService) {
  }

  map = this.mapService.loadMapFromFile();
  newLocationName: string | undefined;

  deleteMajorLocation(theLocation: MajorLocation) {
    this.map.locations = this.map.locations.filter(location => location !== theLocation)
  }

  addMajorLocation(theName: string | undefined) {
    if (theName != undefined && theName != "") {
      let newMajorLocation:MajorLocation = {
        name: theName,
        subLocations: [],
        id: this.mapService.idCounter
      }
      this.mapService.idCounter++
      this.map.locations.push(newMajorLocation)
    }
    this.newLocationName = ""
  }
}
