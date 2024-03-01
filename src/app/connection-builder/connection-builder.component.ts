import { Component } from '@angular/core';
import {MapManagerService} from "../map-management/map-manager.service";

@Component({
  selector: 'sml-edit-connection-builder',
  standalone: true,
  imports: [],
  templateUrl: './connection-builder.component.html',
  styleUrl: './connection-builder.component.css'
})
export class ConnectionBuilderComponent {

    constructor(protected mapService: MapManagerService) {
    }
}
