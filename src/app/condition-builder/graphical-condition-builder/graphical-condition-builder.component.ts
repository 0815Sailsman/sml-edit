import { Component } from '@angular/core';
import {ConditionSubjects} from "../ConditionSubjects";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {AtomicCondition} from "../../map-management/atomicCondition";
import {
  AtomicConditionBuilderDialogComponent
} from "../atomic-condition-builder-dialog/atomic-condition-builder-dialog.component";
import {MapManagerService} from "../../map-management/map-manager.service";

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

  constructor(private mapService: MapManagerService) {
  }

  protected readonly Object = Object;
  inAtomicConditionCreation: boolean = false;
  localConditions: AtomicCondition[] = [];
  conditionCount: number = 1;
  doBrackets: boolean = false;

  increaseConditions() {
    this.conditionCount++
  }

  decreaseConditions() {
    this.conditionCount--
  }

  addNewLocalCondition(newCondition: AtomicCondition) {
    this.localConditions.push(newCondition)
  }

  toString(condition: AtomicCondition): string {
    let result = condition.subjectType + " "
    switch (condition.subjectType) {
      case ConditionSubjects.Location: return (result + this.mapService.minorLocationById(condition.subjectId).name + " visited")
      case ConditionSubjects.Item: return (result + this.mapService.itemById(condition.subjectId).name + " collected")
      case ConditionSubjects.Enemy: return (result + this.mapService.enemyById(condition.subjectId).name + " killed")
      case ConditionSubjects.OtherObject: return (result + this.mapService.otherObjectById(condition.subjectId).name + " interacted with")
    }
  }
}
