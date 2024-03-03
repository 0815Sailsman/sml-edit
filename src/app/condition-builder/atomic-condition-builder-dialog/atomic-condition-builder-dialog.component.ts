import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ConditionSubjects} from "../ConditionSubjects";
import {CommonModule} from "@angular/common";
import {AtomicCondition} from "../../map-management/atomicCondition";
import {FormsModule} from "@angular/forms";
import {SelectFromAllComponent} from "../../select-from-all/select-from-all.component";
import {MapManagerService} from "../../map-management/map-manager.service";


@Component({
  selector: 'sml-edit-atomic-condition-builder-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectFromAllComponent],
  templateUrl: './atomic-condition-builder-dialog.component.html',
  styleUrl: './atomic-condition-builder-dialog.component.css'
})
export class AtomicConditionBuilderDialogComponent implements OnChanges{

  constructor(protected mapService: MapManagerService) {
  }

  protected readonly ConditionSubjects = ConditionSubjects;
  protected readonly Object = Object;

  @Input() opened: boolean = false;
  @Output() createdNewAtomicCondition = new EventEmitter<AtomicCondition>();
  @Output() closedDialog = new EventEmitter<void>();

  @ViewChild('atomicDialog') dialogTag: ElementRef | undefined;
  currentSubject: ConditionSubjects = ConditionSubjects.Location;

  ngOnChanges(changes: SimpleChanges) {
    if (this.opened) {
      this.dialogTag?.nativeElement.showModal()
    }
  }

  fireCreateNewAtomicCondition() {
    this.createdNewAtomicCondition.emit({
      name: "",
      parts: []
    })
  }

  fireCloseDialog() {
    this.opened = false;
    this.closedDialog.emit()
  }
}