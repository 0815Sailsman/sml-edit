import { Injectable } from '@angular/core';
import {AbstractMapLoaderService} from "./abstract-map-loader.service";
import { Map } from '../map';

@Injectable({
  providedIn: 'root'
})
export class FromNameMapCreatorService extends AbstractMapLoaderService {
  get mapName(): string {
    return this._mapName;
  }

  set mapName(value: string) {
    this._mapName = value;
  }

  private _mapName: string = "default";

  load(): Map {
    return {
      name: this._mapName,
      locations:[]
    };
  }
}
