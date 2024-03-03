import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EasilySelectable} from "../EasilySelectable";

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
  selected: T | undefined;

  @Input() label: string = "";
  @Input() allOptions: T[] = [];
  @Output() selectedChanged = new EventEmitter<T>();

  fireChange() {
    this.selectedChanged.emit(this.selected)
  }
}
