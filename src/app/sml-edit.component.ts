import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AbstractMapLoaderService } from "./map-management/loader/abstract-map-loader.service";
import { MajorLocationCardComponent } from "./major-location-card/major-location-card.component";
import {MajorLocation} from "./map-management/majorLocation";
import {FormsModule} from "@angular/forms";
import {MapManagerService} from "./map-management/map-manager.service";
import {FileChangeEvent} from "@angular/compiler-cli/src/perform_watch";
import {FromFileMapLoaderService} from "./map-management/loader/from-file-map-loader.service";

@Component({
  selector: 'sml-edit-root',
  standalone: true,
  imports: [RouterOutlet, MajorLocationCardComponent, CommonModule, FormsModule],
  templateUrl: './sml-edit.component.html',
  styleUrl: './sml-edit.component.css'
})
export class SmlEditComponent {

  constructor(protected mapService: MapManagerService, private loader: FromFileMapLoaderService) {}

  newLocationName: string | undefined;
  filename: string | undefined;

  deleteMajorLocation(theLocation: MajorLocation) {
    this.mapService.deleteMajorLocation(theLocation)
  }

  addMajorLocation(theName: string | undefined) {
    this.mapService.allMinorLocations()
    if (theName != undefined && theName != "") {
      this.mapService.addMajorLocationWithName(theName)
      this.newLocationName = ""
    }
  }

  saveMapToFile() {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(this.mapService.map)], {type: "application/json"});
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
