import {AfterContentInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {depluralizeSimple} from "../util";
import {Location} from "../map-management/location";
import {Pair} from "../Pair";
import {KeyInLocation} from "../KeyInLocation";
import {ObjectInLocation} from "../ObjectInLocation";
import {NgIf} from "@angular/common";
import {Connection} from "../map-management/connection";
import {BigCondition} from "../map-management/bigCondition";
import {MapManagerService} from "../map-management/map-manager.service";
import {Enemy} from "../map-management/enemy";
import {OtherObject} from "../map-management/otherObject";
import {Item} from "../map-management/item";
import {first} from "rxjs";
import {EasilySelectable} from "../EasilySelectable";

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
  @Input() name: string = "";
  @Input() key!: KeyInLocation;
  @Output() objectDeleted = new EventEmitter<Pair<T, KeyInLocation>>();
  @Output() editObject = new EventEmitter<Pair<T, KeyInLocation>>();
  @Output() editObjectWithoutKey = new EventEmitter<T>();
  @Output() objectDeletedWithoutKey = new EventEmitter<T>();

  protected readonly depluralizeSimple = depluralizeSimple;

  constructor(protected mapService: MapManagerService) {
  }

  fireObjectDeleted() {
    this.objectDeleted.emit({first: this.genericObject, second: this.key})
    this.objectDeletedWithoutKey.emit(this.genericObject)
  }

  fireObjectEdited() {
    this.editObject.emit({first: this.genericObject, second: this.key});
    this.editObjectWithoutKey.emit(this.genericObject)
  }

  isConnection(value: any): value is Connection {
    return 'to' in value;
  }

  isCountable(value: any): value is Item {
    return 'count' in value;
  }

  asAny(o: any): any {
    return o;
  }
}
