import {Component, Input} from '@angular/core';

@Component({
  selector: 'sml-edit-single-generic-object',
  standalone: true,
  imports: [],
  templateUrl: './single-generic-object.component.html',
  styleUrl: './single-generic-object.component.css'
})
export class SingleGenericObjectComponent<T> {

  @Input() genericObject?: T;
  @Input() objectToString: (a: T | undefined) => string = (obj : T | undefined) => "uninitialized name 2";

}
