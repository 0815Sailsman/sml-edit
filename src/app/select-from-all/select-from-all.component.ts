import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EasilySelectable} from "../model/EasilySelectable";
import {MapManagerService} from "../map-management/map-manager.service";

@Component({
  selector: 'sml-edit-select-from-all',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './select-from-all.component.html',
  styleUrl: './select-from-all.component.css'
})
export class SelectFromAllComponent<T extends EasilySelectable>  {
  @Input() label: string = "";
  @Input() allOptions: T[] = [];
  @Input() selection: T | undefined;
  @Output() selectionChange = new EventEmitter<T>();

  constructor(protected mapService: MapManagerService) {
  }

  fireChange() {
    this.selectionChange.emit(this.selection)
  }
}
