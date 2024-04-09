import { Injectable } from '@angular/core';
import { Map } from '../map';
import map from "../../../assets/map.json";
import {IdManagerService} from "../id-manager.service";

@Injectable({
  providedIn: 'root'
})
export class FromFileMapLoaderService {

  constructor(private idService: IdManagerService) {
  }

  // todo rework these any types
  load(name: string, areas: any, items: any): Map {
    const map: Map = new Map(name, areas, items);
    this.idService.initIDsFromMap(map);
    return map;
  }

  loadDefault(): Map {
    return this.load(map.name, map.areas, map.items);
  }

  loadFromString(fileContent: string): Map | undefined {
    const parsedObject: any = JSON.parse(fileContent)
    try {
      return this.load(parsedObject.name, parsedObject.areas, parsedObject.items);
    } catch (e) {
      console.log("Error parsing map file")
    }
    return undefined
  }
}
