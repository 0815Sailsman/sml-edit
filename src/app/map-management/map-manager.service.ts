import {Injectable} from '@angular/core';
import {Area} from "./area";
import {Map} from './map';
import {FromFileMapLoaderService} from "./loader/from-file-map-loader.service";
import {Location} from "./location";
import {Connection} from "./connection";
import {Item} from "./item";
import {Enemy} from "./enemy";
import {OtherObject} from "./otherObject";
import {NPC} from "./NPC";
import {ObjectInLocation} from "../ObjectInLocation";
import {KeyInLocation} from "../KeyInLocation";
import {BigCondition} from "./bigCondition";
import {ConditionSubjects} from "../condition-builder/ConditionSubjects";
import {verbFor} from "../ConditionVerb";
import {ItemType} from "./itemType";
import {Drop} from "./drop";
import {ShopItem} from "./ShopItem";
import {EasilySelectable} from "../EasilySelectable";
import {IdManagerService} from "./id-manager.service";
import {ExtractorService} from "./extractor-service/extractor.service";

@Injectable({
  providedIn: 'root'
})
export class MapManagerService {

  constructor(private mapLoaderService: FromFileMapLoaderService, private idService: IdManagerService, private extractor: ExtractorService) { }

  map: Map = this.mapLoaderService.loadDefault();

  deleteArea(areaToDelete: Area) {
    this.map.areas = this.map.areas.filter(area => area !== areaToDelete)
  }

  addAreaWithName(theName: string) {
    const newArea = new Area(this.idService.nextAreaID(), theName);
    this.map.areas.push(newArea)
  }

  addLocationTo(area: Area, theName: string) {
    const newLocation = new Location(this.idService.nextLocationID(), theName);
    this.map.areas[this.map.areas.indexOf(area)].locations.push(newLocation)
  }

  deleteLocationFrom(area: Area, theLocationToBeDeleted: Location) {
    let areaIndex: number = this.map.areas.indexOf(area);
    this.map.areas[areaIndex].locations =
      this.map.areas[areaIndex].locations.filter(location => location.id !== theLocationToBeDeleted.id)
  }

  deleteGeneralObjectFromLocationInArea(
    area: Area | undefined,
    location: Location | undefined,
    theObject: ObjectInLocation | undefined,
    key: KeyInLocation | undefined)
  {
    if (area == undefined || location == undefined || theObject == undefined || key == undefined) {
      return
    }
    const areaIndex = this.map.areas.indexOf(area);
    const locationIndex = this.map.areas[areaIndex].locations.indexOf(location)
    // @ts-ignore THIS WORKS, BECAUSE WE DON'T MIX DIFFERENT TYPES
    this.map.areas[areaIndex].locations[locationIndex][key] =
      this.map.areas[areaIndex].locations[locationIndex][key].filter(object => object.id !== theObject.id)
  }

  allLocations(): Location[] {
    return this.extractor.allLocations(this.map);
  }

  allItems(): Item[] {
    return this.extractor.allItems(this.map);
  }

  allEnemies(): Enemy[] {
    return this.extractor.allEnemies(this.map);
  }

  allItemTypes(): ItemType[] {
    return this.extractor.allItemTypes(this.map);
  }

  allOtherObjects(): OtherObject[] {
    return this.extractor.allOtherObjects(this.map);
  }

  locationById(id: number): Location {
    return this.extractor.allLocations(this.map).filter(value => value.id == id)[0];
  }

  itemByID(id: number): Item {
    return this.extractor.allItems(this.map).filter(item => item.id == id)[0];
  }

  itemTypeById(id: number): ItemType {
    return this.map.items.filter(value => value.id == id)[0];
  }

  enemyById(id: number): Enemy {
    return this.extractor.allEnemies(this.map).filter(value => value.id == id)[0];
  }

  otherObjectById(id: number): OtherObject {
    return this.extractor.allOtherObjects(this.map).filter(value => value.id == id)[0]
  }

  createOrUpdateConnectionFromLocation(
    area: Area | undefined,
    from: Location | undefined,
    connection: Connection | undefined)
  {
    if (from === undefined || connection === undefined || area === undefined) {
      return;
    }
    const areaIndex = this.map.areas.indexOf(area);
    const locationIndex = this.map.areas[areaIndex].locations.indexOf(from)
    const connectionIndex = this.map.areas[areaIndex].locations[locationIndex].connections.findIndex(con => con.id == connection?.id);
    if (connectionIndex == -1) {
      this.map.areas[areaIndex].locations[locationIndex].connections.push(connection);
    } else {
      this.map.areas[areaIndex].locations[locationIndex].connections[connectionIndex] = connection;
    }
  }

  createOrUpdateItemInLocation(
    area: Area | undefined,
    location: Location | undefined,
    item: Item | undefined)
  {
    if (area === undefined || location === undefined || item === undefined) {
      return;
    }
    const areaIndex = this.map.areas.indexOf(area);
    const locationIndex = this.map.areas[areaIndex].locations.indexOf(location);
    const itemIndex = this.map.areas[areaIndex].locations[locationIndex].items.findIndex(oldItem => oldItem.id == item?.id);
    if (itemIndex == -1) {
      this.map.areas[areaIndex].locations[locationIndex].items.push(item);
    } else {
      this.map.areas[areaIndex].locations[locationIndex].items[itemIndex] = item;
    }
  }

  createOrUpdateEnemyInLocation(
    area: Area | undefined,
    location: Location | undefined,
    enemy: Enemy | undefined)
  {
    if (area === undefined || location === undefined || enemy === undefined) {
      return;
    }
    const areaIndex = this.map.areas.indexOf(area);
    const locationIndex = this.map.areas[areaIndex].locations.indexOf(location);
    const enemyIndex = this.map.areas[areaIndex].locations[locationIndex].enemies.findIndex(oldEnemy => oldEnemy.id == enemy?.id);
    if (enemyIndex == -1) {
      this.map.areas[areaIndex].locations[locationIndex].enemies.push(enemy);
    } else {
      this.map.areas[areaIndex].locations[locationIndex].enemies[enemyIndex] = enemy;
    }
  }

  createOrUpdateObjectInLocation(
    area: Area | undefined,
    location: Location | undefined,
    object: OtherObject | undefined)
  {
    if (area === undefined || location === undefined || object === undefined) {
      return;
    }
    const areaIndex = this.map.areas.indexOf(area);
    const locationIndex = this.map.areas[areaIndex].locations.indexOf(location);
    const objectIndex = this.map.areas[areaIndex].locations[locationIndex].objects.findIndex(oldObject => oldObject.id == object?.id);
    if (objectIndex == -1) {
      this.map.areas[areaIndex].locations[locationIndex].objects.push(object);
    } else {
      this.map.areas[areaIndex].locations[locationIndex].objects[objectIndex] = object;
    }
  }

  createOrUpdateNPCInLocation(
    area: Area | undefined,
    location: Location | undefined,
    npc: NPC | undefined)
  {
    if (area === undefined || location === undefined || npc === undefined) {
      return;
    }
    const areaIndex = this.map.areas.indexOf(area);
    const locationIndex = this.map.areas[areaIndex].locations.indexOf(location);
    const npcIndex = this.map.areas[areaIndex].locations[locationIndex].npcs.findIndex(oldNPC => oldNPC.id == npc?.id);
    if (npcIndex == -1) {
      this.map.areas[areaIndex].locations[locationIndex].npcs.push(npc);
    } else {
      this.map.areas[areaIndex].locations[locationIndex].npcs[npcIndex] = npc;
    }
  }

  conditionToString(condition: BigCondition | undefined): string {
    if (condition === undefined) {
      return "";
    }
    return condition.grammar
      .split(' ')
      .map(wordInGrammar => {
        let result = "";
        let wordIndex: number = 0;
        if (wordInGrammar.startsWith('(')) {
          result += '(';
          wordIndex++;
        }
        const ascii = wordInGrammar.charCodeAt(wordIndex)
        if (ascii >= 65 && ascii <= 90) {
          const localCondition = condition.subConditions.find(atomicCondition => atomicCondition.abbreviation.charCodeAt(0) == ascii)!
          result += localCondition?.subjectType + " "
          switch (localCondition?.subjectType) {
            case ConditionSubjects.Location: result += this.locationById(localCondition.subjectId).name;break;
            case ConditionSubjects.Item: result += this.itemTypeById(this.itemByID(localCondition.subjectId).itemTypeID).name;break;
            case ConditionSubjects.Enemy: result += this.enemyById(localCondition.subjectId).name;break;
            case ConditionSubjects.OtherObject: result += this.otherObjectById(localCondition.subjectId).name;break;
          }
          result += " has been " + verbFor(localCondition.subjectType)
          if (wordInGrammar.endsWith(')')) {
            result += ')';
          }
          return result;
        } else {
          return wordInGrammar
        }
      })
      .join(' ');
  }

  itemTypeToString(itemType: ItemType | undefined): string {
    if (itemType == undefined) {
      return "undefined"
    }
    return itemType.name;
  }

  dropToString(drop: Drop | undefined): string {
    if (drop == undefined) {
      return "undefined"
    }
    return drop.item.count + "x " + drop.item.toString(this) + " with " + drop.chance + "% dropchance";
  }

  shopItemToString(shopItem: ShopItem | undefined): string {
    if (shopItem == undefined) {
      return "undefined";
    }
    return shopItem.item.toString(this);
  }

  easilySelectableToString(option: EasilySelectable) {
    if (this.easilySelectableIsItem(option)) return option.toString(this);
    return option.name;
  }

  easilySelectableIsItem(value: any): value is Item {
    return !('name' in value);
  }

  // returns the id of the newly created itemtype
  addItemTypeWithName(newItemTypeName: string | undefined): number | undefined {
    if (newItemTypeName !== undefined) {
      const newID: number = this.idService.nextItemTypeID();
      this.map.items.push({
        name: newItemTypeName,
        id: newID
      })
      return newID;
    }
    return undefined
  }

  updateAreaWithIDToName(id: number | undefined, editedName: string) {
    if (id !== undefined) {
      const areaIndex = this.map.areas.findIndex(area => area.id == id);
      this.map.areas[areaIndex].name = editedName;
    }
  }

  updateLocationWithIDToName(
    area: Area | undefined,
    id: number | undefined,
    editedName: string | undefined)
  {
    if (area === undefined || id === undefined || editedName === undefined) {
      return;
    }
    const areaIndex = this.map.areas.indexOf(area);
    const locationIndex = this.map.areas[areaIndex].locations.findIndex(location => location.id == id);
    this.map.areas[areaIndex].locations[locationIndex].name = editedName;
  }
}
