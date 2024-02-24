import { Injectable } from '@angular/core';
import {MapLoaderService} from "./map-loader.service";
import {MajorLocationInterface} from "./majorLocation.interface";

@Injectable({
  providedIn: 'root'
})
export class MapManagerService {

  constructor(private mapLoaderService: MapLoaderService) { }

  map = this.mapLoaderService.initMapFromFile();
  idCounter: number = 1

  deleteMajorLocation(theLocation: MajorLocationInterface) {
    this.map.locations = this.map.locations.filter(location => location !== theLocation)
  }

  addMajorLocationWithName(theName: string) {
    let newMajorLocation:MajorLocationInterface = {
      name: theName,
      subLocations: [],
      id: this.idCounter++
    }
    this.map.locations.push(newMajorLocation)
  }
}
