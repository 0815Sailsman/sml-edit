import { Injectable } from '@angular/core';
import { Map } from '../map';
import { AbstractMapLoaderService } from "./abstract-map-loader.service";
import map from "../../../assets/map.json";

@Injectable({
  providedIn: 'root'
})
export class FromFileMapLoaderService extends AbstractMapLoaderService {
  load(): Map {
    return new Map(map.name, map.locations)
  }
}
