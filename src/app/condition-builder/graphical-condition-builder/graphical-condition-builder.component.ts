import { Component } from '@angular/core';
import {ConditionSubjects} from "../ConditionSubjects";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {AtomicCondition} from "../../map-management/atomicCondition";
import {
  AtomicConditionBuilderDialogComponent
} from "../atomic-condition-builder-dialog/atomic-condition-builder-dialog.component";

@Component({
  selector: 'sml-edit-graphical-condition-builder',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    AtomicConditionBuilderDialogComponent
  ],
  templateUrl: './graphical-condition-builder.component.html',
  styleUrl: './graphical-condition-builder.component.css'
})
export class GraphicalConditionBuilderComponent {

  protected readonly Object = Object;
  inAtomicConditionCreation: boolean = false;
  localConditions: AtomicCondition[] = [];
  conditionCount: number = 1;

  increaseConditions() {
    this.conditionCount++
  }

  decreaseConditions() {
    this.conditionCount--
  }

  addNewLocalCondition(newCondition: AtomicCondition) {
    this.localConditions.push(newCondition)
  }
}
