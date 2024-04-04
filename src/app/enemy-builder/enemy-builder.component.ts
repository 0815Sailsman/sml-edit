import {Component, EventEmitter, Input, Output} from '@angular/core';
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
import {ItemBuilderHeaderComponent} from "../item-builder/item-builder-header/item-builder-header.component";
import {DropBuilderComponent} from "./drop-builder/drop-builder.component";
import {IdManagerService} from "../map-management/id-manager.service";
import {AtomicCondition} from "../map-management/atomicCondition";

@Component({
  selector: 'sml-edit-enemy-builder',
  standalone: true,
  imports: [
    CommonModule,
    ConditionBuilderComponent,
    FormsModule,
    SelectFromAllComponent,
    ItemBuilderComponent,
    ItemBuilderHeaderComponent,
    DropBuilderComponent
  ],
  templateUrl: './enemy-builder.component.html',
  styleUrl: './enemy-builder.component.css'
})
export class EnemyBuilderComponent {

  constructor(protected mapService: MapManagerService, private idService: IdManagerService) {
  }

  @Input() startingConditions: AtomicCondition[] = [];
  @Output() enemyCreated = new EventEmitter<Enemy>();

  enemyName: string | undefined;
  souls: number | undefined;
  condition: BigCondition | undefined;
  drops: Drop[] = [];
  respawns: boolean = true;
  dropToEdit: Drop | undefined;

  updateInternalCondition(updatedCondition: BigCondition) {
    this.condition = updatedCondition;
  }

  createNewEnemy() {
    if (this.enemyName !== undefined && this.souls !== undefined) {
      this.enemyCreated.emit({
        id: this.idService.nextEnemyID(),
        name: this.enemyName,
        souls: this.souls,
        respawns: this.respawns,
        drops: this.drops,
        if: this.condition
      })
    }
  }

  addOrUpdateDrop(drop: Drop) {
    const dropIndex = this.findIndexForDrop(drop);
    if (dropIndex == -1) {
      this.drops.push(drop);
    } else {
      this.drops[dropIndex] = drop;
    }
  }

  editDrop(drop: Drop) {
    this.dropToEdit = drop;
  }

  deleteDrop(drop: Drop) {
    this.drops = this.drops.filter(existingDrop => existingDrop.item.itemTypeID !== drop.item.itemTypeID)
  }

  findIndexForDrop(drop: Drop): number {
    return this.drops
      .map(drop => drop.item)
      .findIndex(item => item.itemTypeID == drop.item.itemTypeID);
  }
}
