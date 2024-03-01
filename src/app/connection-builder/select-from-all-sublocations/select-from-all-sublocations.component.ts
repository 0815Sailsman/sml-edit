import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MapManagerService} from "../../map-management/map-manager.service";
import {Location} from "../../map-management/location";
import {Connection} from "../../map-management/connection";

@Component({
  selector: 'sml-edit-select-from-all-sublocations',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './select-from-all-sublocations.component.html',
  styleUrl: './select-from-all-sublocations.component.css'
})
export class SelectFromAllSublocationsComponent {

  targetLocation: Location | undefined;

  constructor(protected mapService: MapManagerService) {
  }

  @Input() label: string = "";
  @Output() selectedSublocationChanged = new EventEmitter<Location>();

  fireChangeLocation() {
    this.selectedSublocationChanged.emit(this.targetLocation)
  }
}
