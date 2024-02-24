import { Injectable } from '@angular/core';
import {MajorLocationInterface} from "./majorLocation.interface";
import {FromNameMapCreatorService} from "./loader/from-name-map-creator.service";
import { Map } from './map';
import {FromFileMapLoaderService} from "./loader/from-file-map-loader.service";

@Injectable({
  providedIn: 'root'
})
export class MapManagerService {

  constructor(private mapLoaderService: FromFileMapLoaderService) { }

  map: Map = this.mapLoaderService.load();
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
