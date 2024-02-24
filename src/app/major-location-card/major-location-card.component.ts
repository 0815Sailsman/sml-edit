import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MajorLocationInterface} from "../map-management/majorLocation.interface";
import {emit} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

@Component({
  selector: 'app-major-location-card',
  standalone: true,
  imports: [],
  templateUrl: './major-location-card.component.html',
  styleUrl: './major-location-card.component.css'
})
export class MajorLocationCardComponent {

  @Input() majorLocation: MajorLocationInterface | undefined;
  @Output() locationDeleted = new EventEmitter<MajorLocationInterface>();

  fireLocationDeleted() {
    this.locationDeleted.emit(this.majorLocation)
  }
}
