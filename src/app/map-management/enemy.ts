export interface Enemy {
  name: string
}

export function enemyToString(enemy: Enemy | undefined): string {
  if (enemy == undefined) {
    return "undefined"
  }
  return enemy.name;
}
