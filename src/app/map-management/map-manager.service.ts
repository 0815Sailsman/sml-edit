import { Injectable } from '@angular/core';
import {MajorLocationInterface} from "./majorLocation.interface";
import {FromNameMapCreatorService} from "./loader/from-name-map-creator.service";
import { Map } from './map';
import {FromFileMapLoaderService} from "./loader/from-file-map-loader.service";
import {LocationInterface} from "./location.interface";
import {ConnectionInterface} from "./connection.interface";
import {ItemInterface} from "./item.interface";
import {EnemyInterface} from "./enemy.interface";
import {OtherObjectInterface} from "./otherObject.interface";
import {NpcInterface} from "./npc.interface";

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

  addMinorLocationTo(majorLocation: MajorLocationInterface, theName: string) {
    let newMinorLocation: LocationInterface = {
      id: this.idCounter++,
      name: theName,
      connections: [],
      items: [],
      enemies: [],
      objects: [],
      npcs: [],
      visited: false
    }
    this.map.locations[this.map.locations.indexOf(majorLocation)].subLocations.push(newMinorLocation)
  }

  deleteSubLocationFrom(majorLocation: MajorLocationInterface, theLocationToBeDeleted: LocationInterface) {
    let index: number = this.map.locations.indexOf(majorLocation)
    this.map.locations[index].subLocations =
      this.map.locations[index].subLocations.filter(location => location !== theLocationToBeDeleted)
  }
}
