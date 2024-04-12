import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SingleGenericObjectComponent} from "../single-generic-object/single-generic-object.component";
import {NgForOf, NgIf} from "@angular/common";
import {KeyInLocation} from "../KeyInLocation";
import {EnemyBuilderComponent} from "../enemy-builder/enemy-builder.component";
import {Enemy} from "../map-management/enemy";
import {AtomicCondition} from "../map-management/atomicCondition";

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
export class EnemyManagerComponent {

  @Input() enemies : Enemy[] = [];
  @Output() enemyDeleted = new EventEmitter<Enemy>();
  @Output() enemyCreatedOrUpdated = new EventEmitter<Enemy>();

  showingDetails: boolean = false;
  enemyToEdit: Enemy | undefined;

  editEnemy(enemy: Enemy) {
    this.enemyToEdit = enemy;
  }

  deleteEnemy(enemy: Enemy){
    this.enemyDeleted.emit(enemy);
  }

  toggleDetails() {
    this.showingDetails = !this.showingDetails;
  }

  createOrUpdateEnemy(enemy: Enemy) {
    this.enemyCreatedOrUpdated.emit(enemy);
  }

  // todo these are duplicate in every manager! reduce to one location!
  extractConditions(enemies: Enemy[]): AtomicCondition[] {
    const enemiesWithDuplicates = enemies
      .flatMap(oldEnemy => oldEnemy.availableIf?.subConditions ?? []);
    return this.filterDuplicateConditions(enemiesWithDuplicates);
  }

  filterDuplicateConditions(arr: AtomicCondition[]): AtomicCondition[] {
    const seen = new Set<string>(); // Set to store string representations of objects
    return arr.filter(item => {
      const stringified = JSON.stringify(item); // Convert object to string
      if (seen.has(stringified)) {
        return false;
      } else {
        seen.add(stringified);
        return true;
      }
    });
  }

  protected readonly KeyInLocation = KeyInLocation;
}
