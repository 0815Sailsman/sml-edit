import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgClass, NgForOf, NgIf} from "@angular/common";
import {TextualConditionBuilderComponent} from "./textual-condition-builder/textual-condition-builder.component";
import {GraphicalConditionBuilderComponent} from "./graphical-condition-builder/graphical-condition-builder.component";
import {BigCondition} from "../map-management/bigCondition";

@Component({
  selector: 'sml-edit-condition-builder',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    NgIf,
    CommonModule,
    TextualConditionBuilderComponent,
    GraphicalConditionBuilderComponent
  ],
  templateUrl: './condition-builder.component.html',
  styleUrl: './condition-builder.component.css'
})
export class ConditionBuilderComponent {

  textMode: boolean = false;
  @Output() internalConditionChanged = new EventEmitter<BigCondition>();

  toggleConditionEntryMode() {
    this.textMode = !this.textMode;
  }

  updateInternalCondition(updatedCondition: BigCondition) {
    this.internalConditionChanged.emit(updatedCondition)
  }
}
