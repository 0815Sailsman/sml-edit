import { Injectable } from '@angular/core';
import { Map } from './map';
import map from '../assets/map.json'

@Injectable({
  providedIn: 'root'
})
export class MapLoaderService {

  constructor() { }

  initMapFromFile(): Map {
    console.log(map instanceof Map)
    return new Map(map.name, map.locations)
  }

  initNewMapWithName(mapName: string): Map {
    return {
      name: mapName,
      locations:[]
    };
  }
}
