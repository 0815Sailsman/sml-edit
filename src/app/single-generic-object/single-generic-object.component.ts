import {AfterContentInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {depluralizeSimple} from "../util";
import {Location} from "../map-management/location";
import {Pair} from "../Pair";
import {KeyInSublocation} from "../KeyInSublocation";
import {ObjectInSublocation} from "../ObjectInSublocation";
import {NgIf} from "@angular/common";
import {Connection} from "../map-management/connection";
import {BigCondition} from "../map-management/bigCondition";
import {MapManagerService} from "../map-management/map-manager.service";
import {Enemy} from "../map-management/enemy";
import {OtherObject} from "../map-management/otherObject";
import {Item} from "../map-management/item";
import {first} from "rxjs";

@Component({
  selector: 'sml-edit-single-generic-object',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './single-generic-object.component.html',
  styleUrl: './single-generic-object.component.css'
})
export class SingleGenericObjectComponent<T extends ObjectInSublocation> {

  @Input() genericObject?: T;
  @Input() name: string = "";
  @Input() key!: KeyInSublocation;
  @Input() objectToString: (a: T | undefined) => string = (obj : T | undefined) => "uninitialized name";
  @Output() objectDeleted = new EventEmitter<Pair<T, KeyInSublocation>>();
  @Output() editObject = new EventEmitter<Pair<T, KeyInSublocation>>();

  protected readonly depluralizeSimple = depluralizeSimple;

  constructor(protected mapService: MapManagerService) {
  }

  fireObjectDeleted() {
    this.objectDeleted.emit({first: this.genericObject, second: this.key})
  }

  fireObjectEdited() {
    this.editObject.emit({first: this.genericObject, second: this.key});
  }

  isConnection(value: any): value is Connection {
    return 'to' in value
  }

  isCountable(value: any): value is Item {
    return 'count' in value
  }

  asAny(o: any): any {
    return o
  }
}
