import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ConditionBuilderComponent} from "../condition-builder/condition-builder.component";
import {FormsModule} from "@angular/forms";
import {MapManagerService} from "../../map-management/map-manager.service";
import {BigCondition} from "../../model/bigCondition";
import {SelectFromAllComponent} from "../../select-from-all/select-from-all.component";
import {ItemBuilderComponent} from "../item-builder/item-builder.component";
import {Item} from "../../model/item";
import {CommonModule} from "@angular/common";
import {Drop} from "../../model/drop";
import {Enemy} from "../../model/enemy";
import {ItemBuilderHeaderComponent} from "../item-builder-header/item-builder-header.component";
import {DropBuilderComponent} from "../drop-builder/drop-builder.component";
import {IdManagerService} from "../../map-management/id-manager.service";
import {AtomicCondition} from "../../model/atomicCondition";

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
export class EnemyBuilderComponent implements OnChanges {

  @ViewChild(ConditionBuilderComponent) conditionBuilder!: ConditionBuilderComponent;
  @ViewChild(DropBuilderComponent) dropBuilder!: DropBuilderComponent;

  @Input() startingConditions: AtomicCondition[] = [];
  @Input() editedEnemy: Enemy | undefined;
  @Output() enemyCreatedOrUpdated = new EventEmitter<Enemy>();

  constructor(protected mapService: MapManagerService, private idService: IdManagerService) {
  }

  enemyName: string | undefined;
  souls: number | undefined;
  condition: BigCondition | undefined;
  drops: Drop[] = [];
  respawns: boolean = true;
  dropToEdit: Drop | undefined;
  editing: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (this.editedEnemy !== undefined && !this.editing) {
      this.editing = true;
      this.enemyName = this.editedEnemy.name;
      this.souls = this.editedEnemy.souls;
      this.drops = this.editedEnemy.drops;
      this.respawns = this.editedEnemy.respawns;
      if (this.editedEnemy.availableIf !== undefined) {
        this.condition = this.editedEnemy.availableIf;
      }
    }
  }

  updateInternalCondition(updatedCondition: BigCondition) {
    this.condition = updatedCondition;
  }

  createOrUpdateNewEnemy() {
    if (this.enemyName !== undefined && this.souls !== undefined) {
      this.enemyCreatedOrUpdated.emit(new Enemy(
        this.editedEnemy !== undefined ? this.editedEnemy.id : this.idService.nextEnemyID(),
        this.enemyName,
        this.souls,
        this.respawns,
        this.drops,
        structuredClone(this.condition)
      ));
    }
    this.editedEnemy = undefined;
    this.editing = false;

    this.enemyName = undefined;
    this.souls = undefined;
    this.condition = undefined;
    this.respawns = false;
    this.drops = [];
    this.dropBuilder.clear();
    this.conditionBuilder.clear();
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
