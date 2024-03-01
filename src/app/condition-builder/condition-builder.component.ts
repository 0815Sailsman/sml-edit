import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgClass, NgForOf, NgIf} from "@angular/common";
import {AtomicCondition} from "../map-management/atomicCondition";
import {KeyInSublocation} from "../KeyInSublocation";
import {ConditionSubjects} from "./ConditionSubjects";

@Component({
  selector: 'sml-edit-condition-builder',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    NgIf,
    CommonModule
  ],
  templateUrl: './condition-builder.component.html',
  styleUrl: './condition-builder.component.css'
})
export class ConditionBuilderComponent {

  conditionString: string = "";
  textMode: boolean = false;

  localConditions: AtomicCondition[] = [];
  conditionCount: number = 1;
  inAtomicConditionCreation: boolean = false;

  isSyntacticallyCorrect(conditionString: string): boolean {
    return true;
  }

  toggleConditionEntryMode() {
    this.textMode = !this.textMode;
  }

  increaseConditions() {
    this.conditionCount++
  }

  decreaseConditions() {
    this.conditionCount--
  }

  startAtomicConditionCreation() {
    this.inAtomicConditionCreation = true
  }

  stopAtomicConditionCreation() {
    this.inAtomicConditionCreation = false
  }

  protected readonly ConditionSubjects = ConditionSubjects;
  protected readonly Object = Object;
}
