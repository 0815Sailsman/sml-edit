import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConditionSubjects} from "../ConditionSubjects";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {AtomicCondition} from "../../model/atomicCondition";
import {
  AtomicConditionBuilderDialogComponent
} from "../atomic-condition-builder-dialog/atomic-condition-builder-dialog.component";
import {MapManagerService} from "../../map-management/map-manager.service";
import {BigCondition} from "../../model/bigCondition";

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
export class GraphicalConditionBuilderComponent implements OnInit, OnChanges {

  // Up here because we use it in the attributes block
  @Input() startingConditions: AtomicCondition[] = [];

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
  editing: boolean = false;
  @Input() presetCondition: BigCondition | undefined;
  private dontEmit: boolean = false;

  constructor(private mapService: MapManagerService) {
  }

  @Output() conditionChange = new EventEmitter<BigCondition>();

  ngOnInit() {
    this.condition.subConditions = this.startingConditions;
  }

  ngOnChanges(changes: SimpleChanges) {
    const presetConditionChanges = changes['presetCondition'];
    if (presetConditionChanges !== undefined && presetConditionChanges.previousValue !== undefined && presetConditionChanges.currentValue == undefined) {
      this.editing =false;
    }

    const containsLetterRegex: RegExp = /.*[A-Z].*/;
    const containsBracketsRegex: RegExp = /.*\(.*\).*/;
    const anyBracketRegex: RegExp = /[()]/g;
    const containsCombinatorRegex: RegExp = /[&|]/;

    if (this.presetCondition !== undefined && this.presetCondition !== null && !this.editing) {
      // important for proper updating and change detection
      this.editing = true;
      this.condition = this.presetCondition;

      const elementsOfGrammar = this.presetCondition.grammar.split(' ');
      const allAbbreviationBlocksWithBrackets = elementsOfGrammar.filter(elem => containsLetterRegex.test(elem));
      const allAbbreviationsInOrder = allAbbreviationBlocksWithBrackets.map(block => block.replaceAll(anyBracketRegex, ''));
      const allBracketsInOrder = allAbbreviationBlocksWithBrackets
        .flatMap(block => [block.startsWith('(') ? '(' : '', block.endsWith(')') ? ')' : ''])
        .map(bracketString => this.optionalBracketFromString(bracketString));
      const allConditionsInOrder: AtomicCondition[] =
        allAbbreviationsInOrder.map(
          abbreviation => this.presetCondition?.subConditions.find(
            cond => cond.abbreviation == abbreviation
          )
        ).filter(elem => elem !== undefined) as AtomicCondition[];
      const allCombinators = elementsOfGrammar
        .filter(elem => containsCombinatorRegex.test(elem))
        .map(combinatorString => this.combinatorFromString(combinatorString));

      this.conditionCount = allAbbreviationBlocksWithBrackets.length;
      this.doBrackets = containsBracketsRegex.test(this.presetCondition.grammar)
      this.selectedConditions = allConditionsInOrder;
      this.selectedCombinators = allCombinators;
      this.selectedBrackets = allBracketsInOrder;
    }
  }

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
      case ConditionSubjects.Location:
        return (result + this.mapService.locationById(condition.subjectId).name + " visited")
      case ConditionSubjects.Item:
        return (result + this.mapService.itemByID(condition.subjectId).toString(this.mapService) + " collected")
      case ConditionSubjects.Enemy:
        return (result + this.mapService.enemyById(condition.subjectId).name + " killed")
      case ConditionSubjects.OtherObject:
        return (result + this.mapService.otherObjectById(condition.subjectId).name + " interacted with")
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
    this.condition.grammar += this.selectedConditions[this.selectedConditions.length - 1].abbreviation;
    if (this.doBrackets) this.condition.grammar += this.selectedBrackets[this.selectedBrackets.length - 1];
    if (!this.dontEmit) {
      this.conditionChange.emit(this.condition);
    }
  }

  toggleBrackets() {
    this.dontEmit = false;
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

  combinatorFromString(s: string): Combinator {
    if (s.includes('&')) {
      return Combinator.AND;
    }
    return Combinator.OR;
  }

  optionalBracketFromString(s: string): OptionalBracket {
    if (s.includes('(')) {
      return OptionalBracket.Open;
    } else if (s.includes(')')) {
      return OptionalBracket.Close;
    }
    return OptionalBracket.None;
  }

  clear() {
    this.dontEmit = true;
    this.conditionCount = 1;
    this.doBrackets = false;
    this.selectedConditions = []
    this.selectedCombinators = []
    this.dontEmit = false;
  }
}

export enum Combinator {
  AND = "&&",
  OR = "||"
}

export enum OptionalBracket {
  Open = "(",
  Close = ")",
  None = ""
}
