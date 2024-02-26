import {Component, Input} from '@angular/core';
import { CommonModule} from "@angular/common";

@Component({
  selector: 'sml-edit-generic-object-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-object-manager.component.html',
  styleUrl: './generic-object-manager.component.css'
})
export class GenericObjectManagerComponent<T> {

  @Input() genericObject?: T[];

}
