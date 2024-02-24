import { Injectable } from '@angular/core';
import { MapClass } from './map.class';
import map from '../../assets/map.json'

@Injectable({
  providedIn: 'root'
})
export class MapLoaderService {

  constructor() { }

  initMapFromFile(): MapClass {
    console.log(map instanceof MapClass)
    return new MapClass(map.name, map.locations)
  }

  initNewMapWithName(mapName: string): MapClass {
    return {
      name: mapName,
      locations:[]
    };
  }
}
