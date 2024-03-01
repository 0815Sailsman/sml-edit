import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConditionSubjects} from "../ConditionSubjects";
import {CommonModule} from "@angular/common";
import {AtomicCondition} from "../../map-management/atomicCondition";

@Component({
  selector: 'sml-edit-atomic-condition-builder-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atomic-condition-builder-dialog.component.html',
  styleUrl: './atomic-condition-builder-dialog.component.css'
})
export class AtomicConditionBuilderDialogComponent {

  protected readonly ConditionSubjects = ConditionSubjects;
  protected readonly Object = Object;

  @Input() opened: boolean = false;
  @Output() createdNewAtomicCondition = new EventEmitter<AtomicCondition>();

  fireCreateNewAtomicCondition() {
    this.createdNewAtomicCondition.emit({
      name: "",
      parts: []
    })
  }

}
