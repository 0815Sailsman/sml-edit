import {Component, EventEmitter, Output} from '@angular/core';
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {FormsModule} from "@angular/forms";
import {MapManagerService} from "../map-management/map-manager.service";
import {BigCondition} from "../map-management/bigCondition";
import {SelectFromAllComponent} from "../select-from-all/select-from-all.component";
import {ItemBuilderComponent} from "../item-builder/item-builder.component";
import {Item} from "../map-management/item";
import {CommonModule} from "@angular/common";
import {Drop} from "../map-management/drop";
import {Enemy} from "../map-management/enemy";

@Component({
  selector: 'sml-edit-enemy-builder',
  standalone: true,
  imports: [
    CommonModule,
    ConditionBuilderComponent,
    FormsModule,
    SelectFromAllComponent,
    ItemBuilderComponent
  ],
  templateUrl: './enemy-builder.component.html',
  styleUrl: './enemy-builder.component.css'
})
export class EnemyBuilderComponent {

  constructor(protected mapService: MapManagerService) {
  }

  @Output() enemyCreated = new EventEmitter<Enemy>();

  enemyName: string | undefined;
  souls: number | undefined;
  condition: BigCondition | undefined;
  drops: Drop[] = [];
  dropChance: number = 1.0;
  dropItem: Item | undefined;
  respawns: boolean = true;

  updateInternalCondition(updatedCondition: BigCondition) {
    this.condition = updatedCondition;
  }

  createNewEnemy() {
    if (this.enemyName !== undefined && this.souls !== undefined) {
      this.enemyCreated.emit({
        id: ++this.mapService.idCounter,
        name: this.enemyName,
        souls: this.souls,
        respawns: this.respawns,
        drops: this.drops,
        if: this.condition
      })
    }
  }

  addDrop() {
    if (this.dropItem !== undefined) {
      this.drops.push({item: this.dropItem, chance: this.dropChance})
    }
  }

  setNewDropItem(item: Item) {
    this.dropItem = item;
  }
}