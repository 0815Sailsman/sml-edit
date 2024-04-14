import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ObjectInLocation} from "../ObjectInLocation";
import {NgIf} from "@angular/common";
import {Connection} from "../map-management/connection";
import {MapManagerService} from "../map-management/map-manager.service";

@Component({
  selector: 'sml-edit-single-generic-object',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './single-generic-object.component.html',
  styleUrl: './single-generic-object.component.css'
})
export class SingleGenericObjectComponent<T extends ObjectInLocation> {

  @Input() genericObject?: T;
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  constructor(protected mapService: MapManagerService) {
  }

  fireObjectDeleted() {
    this.delete.emit(this.genericObject)
  }

  fireObjectEdited() {
    this.edit.emit(this.genericObject)
  }
}
