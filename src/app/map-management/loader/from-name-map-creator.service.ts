import { Injectable } from '@angular/core';
import {AbstractMapLoaderService} from "./abstract-map-loader.service";
import { Map } from '../map';

@Injectable({
  providedIn: 'root'
})
export class FromNameMapCreatorService extends AbstractMapLoaderService {

  load(name: string = "default"): Map {
    return {
      name: name,
      locations:[]
    };
  }
}
