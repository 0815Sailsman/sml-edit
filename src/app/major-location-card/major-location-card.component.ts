import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MajorLocation} from "../majorLocation";
import {emit} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

@Component({
  selector: 'app-major-location-card',
  standalone: true,
  imports: [],
  templateUrl: './major-location-card.component.html',
  styleUrl: './major-location-card.component.css'
})
export class MajorLocationCardComponent {

  @Input() majorLocation: MajorLocation | undefined;
  @Output() locationDeleted = new EventEmitter<MajorLocation>();

  fireLocationDeleted() {
    this.locationDeleted.emit(this.majorLocation)
  }
}
