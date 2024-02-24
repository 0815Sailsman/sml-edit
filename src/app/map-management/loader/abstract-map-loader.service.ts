import { Injectable } from '@angular/core';
import { Map } from '../map';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractMapLoaderService {

  abstract load(): Map | null;

}
