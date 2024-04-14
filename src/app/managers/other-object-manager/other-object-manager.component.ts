import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SingleGenericObjectComponent} from "../../single-generic-object/single-generic-object.component";
import {NgForOf, NgIf} from "@angular/common";
import {ObjectBuilderComponent} from "../../object-builder/object-builder.component";
import {OtherObject} from "../../map-management/otherObject";
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
