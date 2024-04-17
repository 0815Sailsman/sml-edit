import {UnparsedBigCondition} from "./UnparsedBigCondition";

import {UnparsedDrop} from "./UnparsedDrop";

export interface UnparsedEnemy {
  id: number
  name: string
  souls: number
  respawns: boolean
  drops: UnparsedDrop[]
  availableIf?: UnparsedBigCondition
}
