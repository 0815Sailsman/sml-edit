import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SingleGenericObjectComponent} from "../../single-generic-object/single-generic-object.component";
import {NgForOf, NgIf} from "@angular/common";
import {EnemyBuilderComponent} from "../../enemy-builder/enemy-builder.component";
import {Enemy} from "../../map-management/enemy";
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

  @Input() enemies: Enemy[] = [];
  @Output() enemyDeleted = new EventEmitter<Enemy>();
  @Output() enemyCreatedOrUpdated = new EventEmitter<Enemy>();

  enemyToEdit: Enemy | undefined;

  editEnemy(enemy: Enemy) {
    this.enemyToEdit = enemy;
  }

  deleteEnemy(enemy: Enemy){
    this.enemyDeleted.emit(enemy);
  }

  createOrUpdateEnemy(enemy: Enemy) {
    this.enemyCreatedOrUpdated.emit(enemy);
  }
}
