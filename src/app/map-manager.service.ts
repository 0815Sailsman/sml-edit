import { Injectable } from '@angular/core';
import {MapLoaderService} from "./map-loader.service";
import {MajorLocation} from "./majorLocation";

@Injectable({
  providedIn: 'root'
})
export class MapManagerService {

  constructor(private mapLoaderService: MapLoaderService) { }

  map = this.mapLoaderService.initMapFromFile();
  idCounter: number = 1

  deleteMajorLocation(theLocation: MajorLocation) {
    this.map.locations = this.map.locations.filter(location => location !== theLocation)
  }

  addMajorLocationWithName(theName: string) {
    let newMajorLocation:MajorLocation = {
      name: theName,
      subLocations: [],
      id: this.idCounter++
    }
    this.map.locations.push(newMajorLocation)
  }
}
