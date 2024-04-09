import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AreaCardComponent } from "./area-card/area-card.component";
import {Area} from "./map-management/area";
import {FormsModule} from "@angular/forms";
import {MapManagerService} from "./map-management/map-manager.service";
import {FromFileMapLoaderService} from "./map-management/loader/from-file-map-loader.service";

@Component({
  selector: 'sml-edit-root',
  standalone: true,
  imports: [RouterOutlet, AreaCardComponent, CommonModule, FormsModule],
  templateUrl: './sml-edit.component.html',
  styleUrl: './sml-edit.component.css'
})
export class SmlEditComponent {

  constructor(protected mapService: MapManagerService, private loader: FromFileMapLoaderService) {}

  newAreaName: string | undefined;
  filename: string | undefined;

  deleteArea(theLocation: Area) {
    this.mapService.deleteArea(theLocation)
  }

  addArea(theName: string | undefined) {
    if (theName != undefined && theName != "") {
      this.mapService.addAreaWithName(theName)
      this.newAreaName = ""
    }
  }

  saveMapToFile() {
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(this.mapService.map)], {type: "application/json"});
    a.href = URL.createObjectURL(file);
    a.download = (this.filename !== undefined ? this.filename : this.mapService.map.name) + ".sml";
    a.click();
  }

  async loadMap(event: any) {
    const file = event.target.files[0];
    const fileContent = await file.text()
    const uploadedMap = this.loader.loadFromString(fileContent)
    if (uploadedMap !== undefined) {
      this.mapService.map = uploadedMap
    }
  }
}
