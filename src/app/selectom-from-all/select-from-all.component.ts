import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {Location} from "../map-management/location";
import {MapManagerService} from "../map-management/map-manager.service";
import {ObjectInSublocation} from "../ObjectInSublocation";

@Component({
  selector: 'sml-edit-select-from-all',
  standalone: true,
    imports: [
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './select-from-all.component.html',
  styleUrl: './select-from-all.component.css'
})
export class SelectFromAllComponent<T extends EasilySelectable> {
  targetLocation: Location | undefined;

  constructor(protected mapService: MapManagerService) {
  }

  @Input() label: string = "";
  @Output() selectedSublocationChanged = new EventEmitter<Location>();

  fireChangeLocation() {
    this.selectedSublocationChanged.emit(this.targetLocation)
  }
}
