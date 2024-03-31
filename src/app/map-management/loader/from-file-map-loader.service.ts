import { Injectable } from '@angular/core';
import { Map } from '../map';
import { AbstractMapLoaderService } from "./abstract-map-loader.service";
import map from "../../../assets/map.json";

@Injectable({
  providedIn: 'root'
})
export class FromFileMapLoaderService extends AbstractMapLoaderService {
  load(): Map {
    return new Map(map.name, map.locations, map.items);
  }

  loadFromString(fileContent: string): Map | undefined {
    const parsedObject: any = JSON.parse(fileContent)
    try {
      return new Map(parsedObject.name, parsedObject.locations, parsedObject.items)
    } catch (e) {
      console.log("Error parsing map file")
    }
    return undefined
  }
}
