import {UnparsedShopItem} from "./UnparsedShopItem";
import {UnparsedBigCondition} from "./UnparsedBigCondition";

export interface UnparsedNPC {
  id: number
  name: string
  shop: UnparsedShopItem[]
  availableIf?: UnparsedBigCondition
}
