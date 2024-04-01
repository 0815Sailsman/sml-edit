import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgClass, NgForOf, NgIf} from "@angular/common";
import {TextualConditionBuilderComponent} from "./textual-condition-builder/textual-condition-builder.component";
import {GraphicalConditionBuilderComponent} from "./graphical-condition-builder/graphical-condition-builder.component";
import {BigCondition} from "../map-management/bigCondition";
import {AtomicCondition} from "../map-management/atomicCondition";

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

  @Input() startingConditions: AtomicCondition[] = [];
  @Output() internalConditionChanged = new EventEmitter<BigCondition>();

  textMode: boolean = false;

  toggleConditionEntryMode() {
    this.textMode = !this.textMode;
  }

  updateInternalCondition(updatedCondition: BigCondition) {
    this.internalConditionChanged.emit(updatedCondition)
  }
}
