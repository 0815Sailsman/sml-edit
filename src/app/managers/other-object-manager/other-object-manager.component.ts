import {Component} from '@angular/core';
import {SingleGenericObjectComponent} from "../../single-generic-object/single-generic-object.component";
import {NgForOf, NgIf} from "@angular/common";
import {ObjectBuilderComponent} from "../../builders/object-builder/object-builder.component";
import {OtherObject} from "../../model/otherObject";
import {AbstractManager} from "../abstract-manager";

@Component({
  selector: 'sml-edit-other-object-manager',
  standalone: true,
  imports: [
    SingleGenericObjectComponent,
    NgForOf,
    ObjectBuilderComponent,
    NgIf
  ],
  templateUrl: './other-object-manager.component.html',
  styleUrl: './other-object-manager.component.css'
})
export class OtherObjectManagerComponent extends AbstractManager {

  override objectToEdit: OtherObject | undefined;

}
