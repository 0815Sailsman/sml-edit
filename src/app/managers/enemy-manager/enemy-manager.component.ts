import {Component} from '@angular/core';
import {SingleGenericObjectComponent} from "../../single-generic-object/single-generic-object.component";
import {NgForOf, NgIf} from "@angular/common";
import {EnemyBuilderComponent} from "../../builders/enemy-builder/enemy-builder.component";
import {Enemy} from "../../model/enemy";
import {AbstractManager} from "../abstract-manager";

@Component({
  selector: 'sml-edit-enemy-manager',
  standalone: true,
  imports: [
    SingleGenericObjectComponent,
    NgForOf,
    EnemyBuilderComponent,
    NgIf
  ],
  templateUrl: './enemy-manager.component.html',
  styleUrl: './enemy-manager.component.css'
})
export class EnemyManagerComponent extends AbstractManager {

  override objectToEdit: Enemy | undefined;

}
