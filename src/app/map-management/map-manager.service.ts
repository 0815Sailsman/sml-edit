import { Injectable } from '@angular/core';
import {MajorLocation} from "./majorLocation";
import {FromNameMapCreatorService} from "./loader/from-name-map-creator.service";
import { Map } from './map';
import {FromFileMapLoaderService} from "./loader/from-file-map-loader.service";
import {Location} from "./location";
import {Connection} from "./connection";
import {Item} from "./item";
import {Enemy} from "./enemy";
import {OtherObject} from "./otherObject";
import {NPC} from "./NPC";
import {ObjectInSublocation} from "../ObjectInSublocation";
import {KeyInSublocation} from "../KeyInSublocation";

@Injectable({
  providedIn: 'root'
})
export class MapManagerService {

  constructor(private mapLoaderService: FromFileMapLoaderService) { }

  map: Map = this.mapLoaderService.load();
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

  addMinorLocationTo(majorLocation: MajorLocation, theName: string) {
    let newMinorLocation: Location = {
      id: this.idCounter++,
      name: theName,
      connections: [],
      items: [],
      enemies: [],
      objects: [],
      npcs: []
    }
    this.map.locations[this.map.locations.indexOf(majorLocation)].subLocations.push(newMinorLocation)
  }

  deleteSubLocationFrom(majorLocation: MajorLocation, theLocationToBeDeleted: Location) {
    let index: number = this.map.locations.indexOf(majorLocation)
    this.map.locations[index].subLocations =
      this.map.locations[index].subLocations.filter(location => location !== theLocationToBeDeleted)
  }

  deleteGeneralObjectFromLocationInMajorLocation(
    majorLocation: MajorLocation | undefined,
    sublocation: Location | undefined,
    theObject: ObjectInSublocation | undefined,
    key: KeyInSublocation | undefined)
  {
    if (majorLocation == undefined || sublocation == undefined || theObject == undefined || key == undefined) {
      return
    }
    const majorIndex = this.map.locations.indexOf(majorLocation);
    const minorIndex = this.map.locations[majorIndex].subLocations.indexOf(sublocation)
    // @ts-ignore THIS WORKS, BECAUSE WE DON'T MIX DIFFERENT TYPES
    this.map.locations[majorIndex].subLocations[minorIndex][key] =
      this.map.locations[majorIndex].subLocations[minorIndex][key].filter(object => object !== theObject)
  }

  allMinorLocations(): Location[] {
    let all: Location[] = []
    for (let major of this.map.locations) {
      all.push(...major.subLocations)
    }
    return all
  }
}
