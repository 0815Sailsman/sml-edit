import {Enemy} from "../../model/enemy";
import {Drop} from "../../model/drop";

export function anEnemy(): Enemy {
  return new Enemy(0, "enemy0", 1,true,[]);
}

export function anotherEnemy(): Enemy {
  return new Enemy(1, "enemy1", 1,true,[]);
}

export function anEnemyDropping(drops: Drop[]): Enemy {
  return new Enemy(0, "enemy0", 1,true,drops);
}

export function anotherEnemyDropping(drops: Drop[]): Enemy {
  return new Enemy(1, "enemy1", 1,true,drops);
}
