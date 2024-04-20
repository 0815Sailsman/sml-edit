import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ConditionSubjects, ConditionSubjectsType} from "../condition-builder/ConditionSubjects";
import {CommonModule} from "@angular/common";
import {AtomicCondition} from "../../model/atomicCondition";
import {FormsModule} from "@angular/forms";
import {SelectFromAllComponent} from "../../select-from-all/select-from-all.component";
import {MapManagerService} from "../../map-management/map-manager.service";
import {ConditionVerb, DEPRECATEDverbFor, verbsFor} from "../../model/ConditionVerb";


@Component({
  selector: 'sml-edit-atomic-condition-builder-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectFromAllComponent],
  templateUrl: './atomic-condition-builder-dialog.component.html',
  styleUrl: './atomic-condition-builder-dialog.component.css'
})
export class AtomicConditionBuilderDialogComponent implements OnChanges, OnInit {

  constructor(protected mapService: MapManagerService) {
  }
  protected readonly Object = Object;

  @Input() opened: boolean = false;
  @Input() preExistingConditionCount: number | undefined;
  @Output() createdNewAtomicCondition = new EventEmitter<AtomicCondition>();
  @Output() closedDialog = new EventEmitter<void>();

  @ViewChild('atomicDialog') dialogTag: ElementRef | undefined;
  currentSubject: ConditionSubjects = ConditionSubjects.Location;
  target: ConditionSubjectsType | undefined;
  verb: ConditionVerb | undefined;
  abbreviationTracker: number = 65;

  ngOnChanges(changes: SimpleChanges) {
    if (this.opened) {
      this.dialogTag?.nativeElement.showModal()
    }
  }

  ngOnInit() {
    if (this.preExistingConditionCount !== undefined) {
      this.abbreviationTracker += this.preExistingConditionCount;
    }
  }

  fireCreateNewAtomicCondition() {
    if (this.target != undefined) {
      this.createdNewAtomicCondition.emit({
        subjectType: this.currentSubject,
        subjectId: this.target.id,
        verb: this.verb ?? DEPRECATEDverbFor(this.currentSubject),
        abbreviation: String.fromCharCode(this.abbreviationTracker++)
      })
    }
  }

  fireCloseDialog() {
    this.opened = false;
    this.closedDialog.emit()
  }

  selectTarget(subject: ConditionSubjectsType) {
    this.target = subject
  }

  protected readonly verbsFor = verbsFor;
  protected readonly ConditionSubjects = ConditionSubjects;

  selectVerb(verb: ConditionVerb) {
    this.verb = verb;
  }
}
