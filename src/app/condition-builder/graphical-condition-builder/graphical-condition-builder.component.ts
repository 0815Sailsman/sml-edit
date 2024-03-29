import {Component, EventEmitter, Output} from '@angular/core';
import {ConditionSubjects} from "../ConditionSubjects";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {AtomicCondition} from "../../map-management/atomicCondition";
import {
  AtomicConditionBuilderDialogComponent
} from "../atomic-condition-builder-dialog/atomic-condition-builder-dialog.component";
import {MapManagerService} from "../../map-management/map-manager.service";
import {BigCondition} from "../../map-management/bigCondition";

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
  conditionCount: number = 1;
  doBrackets: boolean = false;
  selectedConditions: AtomicCondition[] = []
  selectedCombinators: Combinator[] = []
  selectedBrackets: OptionalBracket[] = []
  condition: BigCondition = {
    grammar: "",
    subConditions: []
  }
  @Output() conditionChanged = new EventEmitter<BigCondition>();

  increaseConditions() {
    this.conditionCount++
    this.selectedBrackets.push(OptionalBracket.None, OptionalBracket.None)
  }

  decreaseConditions() {
    this.conditionCount--
    this.selectedBrackets.pop()
    this.selectedBrackets.pop()
  }

  addNewLocalCondition(newCondition: AtomicCondition) {
    this.condition.subConditions.push(newCondition)
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

  protected readonly console = console;

  rebuildGrammar() {
    this.condition.grammar = ""
    for (let index in this.selectedCombinators) {
      if (this.doBrackets) this.condition.grammar += this.selectedBrackets[2 * Number(index)];
      this.condition.grammar += this.selectedConditions[index].abbreviation;
      if (this.doBrackets) this.condition.grammar += this.selectedBrackets[2 * Number(index) + 1];
      this.condition.grammar += " " + this.selectedCombinators[index] + " ";
    }
    if (this.doBrackets) this.condition.grammar += this.selectedBrackets[this.selectedBrackets.length - 2];
    this.condition.grammar += this.selectedConditions[this.selectedConditions.length-1].abbreviation;
    if (this.doBrackets) this.condition.grammar += this.selectedBrackets[this.selectedBrackets.length - 1];
    this.conditionChanged.emit(this.condition)
  }

  toggleBrackets() {
    this.selectedBrackets = []
    this.doBrackets = !this.doBrackets
    if (this.doBrackets) {
      for (let item of [].constructor(this.conditionCount)) {
        this.selectedBrackets.push(OptionalBracket.None, OptionalBracket.None)
      }
    }
  }

  protected readonly Combinator = Combinator;
  protected readonly OptionalBracket = OptionalBracket;
}

export enum Combinator {
  AND= "&&",
  OR="||"
}

export enum OptionalBracket {
  Open="(",
  Close=")",
  None=""
}
