import {Component, EventEmitter, Input, Output} from '@angular/core';
import {depluralizeSimple} from "../util";
import {Location} from "../map-management/location";
import {Pair} from "../Pair";
import {KeyInSublocation} from "../KeyInSublocation";

@Component({
  selector: 'sml-edit-single-generic-object',
  standalone: true,
  imports: [],
  templateUrl: './single-generic-object.component.html',
  styleUrl: './single-generic-object.component.css'
})
export class SingleGenericObjectComponent<T> {

  @Input() genericObject?: T;
  @Input() name: string = "";
  @Input() key!: KeyInSublocation;
  @Input() objectToString: (a: T | undefined) => string = (obj : T | undefined) => "uninitialized name";
  @Output() objectDeleted = new EventEmitter<Pair<T, KeyInSublocation>>();

  protected readonly depluralizeSimple = depluralizeSimple;

  fireObjectDeleted() {
    this.objectDeleted.emit({first: this.genericObject, second: this.key})
  }
}
