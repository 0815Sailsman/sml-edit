import {Injectable} from '@angular/core';
import {MajorLocation} from "./majorLocation";
import {Map} from './map';
import {FromFileMapLoaderService} from "./loader/from-file-map-loader.service";
import {Location} from "./location";
import {Connection} from "./connection";
import {Item} from "./item";
import {Enemy} from "./enemy";
import {OtherObject} from "./otherObject";
import {NPC} from "./NPC";
import {ObjectInSublocation} from "../ObjectInSublocation";
import {KeyInSublocation} from "../KeyInSublocation";
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

  deleteMajorLocation(theLocation: MajorLocation) {
    this.map.locations = this.map.locations.filter(location => location !== theLocation)
  }

  addMajorLocationWithName(theName: string) {
    let newMajorLocation:MajorLocation = {
      name: theName,
      subLocations: [],
      id: this.idService.nextMajorLocationID()
    }
    this.map.locations.push(newMajorLocation)
  }

  addMinorLocationTo(majorLocation: MajorLocation, theName: string) {
    let newMinorLocation: Location = {
      id: this.idService.nextMinorLocationID(),
      name: theName,
      connections: [],
      items: [],
      enemies: [],
      objects: [],
      npcs: []
    }
    this.map.locations[this.map.locations.indexOf(majorLocation)].subLocations.push(newMinorLocation)
  }

  deleteSubLocationFrom(majorLocation: MajorLocation, theLocationToBeDeleted: Location) {
    let index: number = this.map.locations.indexOf(majorLocation)
    this.map.locations[index].subLocations =
      this.map.locations[index].subLocations.filter(location => location !== theLocationToBeDeleted)
  }

  deleteGeneralObjectFromLocationInMajorLocation(
    majorLocation: MajorLocation | undefined,
    sublocation: Location | undefined,
    theObject: ObjectInSublocation | undefined,
    key: KeyInSublocation | undefined)
  {
    if (majorLocation == undefined || sublocation == undefined || theObject == undefined || key == undefined) {
      return
    }
    const majorIndex = this.map.locations.indexOf(majorLocation);
    const minorIndex = this.map.locations[majorIndex].subLocations.indexOf(sublocation)
    // @ts-ignore THIS WORKS, BECAUSE WE DON'T MIX DIFFERENT TYPES
    this.map.locations[majorIndex].subLocations[minorIndex][key] =
      this.map.locations[majorIndex].subLocations[minorIndex][key].filter(object => object !== theObject)
  }

  allMinorLocations(): Location[] {
    return this.extractor.allMinorLocations(this.map);
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

  allNPCs(): NPC[] {
    return this.extractor.allNPCs(this.map);
  }

  minorLocationById(id: number): Location {
    return this.extractor.allMinorLocations(this.map).filter(value => value.id == id)[0];
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

  createOrUpdateConnectionFromLocation(major: MajorLocation | undefined, from: Location | undefined, connection: Connection | undefined) {
    if (from === undefined || connection === undefined || major === undefined) {
      return;
    }
    const majorIndex = this.map.locations.indexOf(major);
    const minorIndex = this.map.locations[majorIndex].subLocations.indexOf(from)
    const connectionIndex = this.map.locations[majorIndex].subLocations[minorIndex].connections.findIndex(con => con.id == connection?.id);
    if (connectionIndex == -1) {
      this.map.locations[majorIndex].subLocations[minorIndex].connections.push(connection);
    } else {
      this.map.locations[majorIndex].subLocations[minorIndex].connections[connectionIndex] = connection;
    }
  }

  createOrUpdateItemInLocation(major: MajorLocation | undefined, location: Location | undefined, item: Item | undefined) {
    if (major === undefined || location === undefined || item === undefined) {
      return;
    }
    const majorIndex = this.map.locations.indexOf(major);
    const minorIndex = this.map.locations[majorIndex].subLocations.indexOf(location);
    const itemIndex = this.map.locations[majorIndex].subLocations[minorIndex].items.findIndex(oldItem => oldItem.id == item?.id);
    if (itemIndex == -1) {
      this.map.locations[majorIndex].subLocations[minorIndex].items.push(item);
    } else {
      this.map.locations[majorIndex].subLocations[minorIndex].items[itemIndex] = item;
    }
  }

  createOrUpdateEnemyInLocation(major: MajorLocation | undefined, location: Location | undefined, enemy: Enemy | undefined) {
    if (major === undefined || location === undefined || enemy === undefined) {
      return;
    }
    const majorIndex = this.map.locations.indexOf(major);
    const minorIndex = this.map.locations[majorIndex].subLocations.indexOf(location);
    const enemyIndex = this.map.locations[majorIndex].subLocations[minorIndex].enemies.findIndex(oldEnemy => oldEnemy.id == enemy?.id);
    if (enemyIndex == -1) {
      this.map.locations[majorIndex].subLocations[minorIndex].enemies.push(enemy);
    } else {
      this.map.locations[majorIndex].subLocations[minorIndex].enemies[enemyIndex] = enemy;
    }
  }

  createOrUpdateObjectInLocation(major: MajorLocation | undefined, location: Location | undefined, object: OtherObject | undefined) {
    if (major === undefined || location === undefined || object === undefined) {
      return;
    }
    const majorIndex = this.map.locations.indexOf(major);
    const minorIndex = this.map.locations[majorIndex].subLocations.indexOf(location);
    const objectIndex = this.map.locations[majorIndex].subLocations[minorIndex].objects.findIndex(oldObject => oldObject.id == object?.id);
    if (objectIndex == -1) {
      this.map.locations[majorIndex].subLocations[minorIndex].objects.push(object);
    } else {
      this.map.locations[majorIndex].subLocations[minorIndex].objects[objectIndex] = object;
    }
  }

  createOrUpdateNPCInLocation(major: MajorLocation | undefined, location: Location | undefined, npc: NPC | undefined) {
    if (major === undefined || location === undefined || npc === undefined) {
      return;
    }
    const majorIndex = this.map.locations.indexOf(major);
    const minorIndex = this.map.locations[majorIndex].subLocations.indexOf(location);
    const npcIndex = this.map.locations[majorIndex].subLocations[minorIndex].npcs.findIndex(oldNPC => oldNPC.id == npc?.id);
    if (npcIndex == -1) {
      this.map.locations[majorIndex].subLocations[minorIndex].npcs.push(npc);
    } else {
      this.map.locations[majorIndex].subLocations[minorIndex].npcs[npcIndex] = npc;
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
            case ConditionSubjects.Location: result += this.minorLocationById(localCondition.subjectId).name;break;
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

  itemToString(item: Item | undefined): string {
    if (item == undefined) {
      return "undefined"
    }
    const itemTypeID: number = this.itemByID(item.id).itemTypeID;
    return this.itemTypeById(itemTypeID).name;
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
    return drop.item.count + "x " + this.itemToString(drop.item) + " with " + drop.chance + "% dropchance";
  }

  shopItemToString(shopItem: ShopItem | undefined): string {
    if (shopItem == undefined) {
      return "undefined"
    }
    return this.itemToString(shopItem.item);
  }

  easilySelectableToString(option: EasilySelectable) {
    if (this.easilySelectableIsItem(option)) return this.itemToString(option)
    return option.name;
  }

  easilySelectableIsItem(value: any): value is Item {
    return !('name' in value);
  }

  dropItemToString(item: Item) {
    return this.itemToString(item);
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

  updateMajorLocationWithIDToName(id: number | undefined, editedName: string) {
    if (id !== undefined) {
      const majorIndex = this.map.locations.findIndex(major => major.id == id);
      this.map.locations[majorIndex].name = editedName;
    }
  }

  updateMinorLocationWithIDToName(major: MajorLocation | undefined, id: number | undefined, editedName: string | undefined) {
    if (major === undefined || id === undefined || editedName === undefined) {
      return;
    }
    const majorIndex = this.map.locations.indexOf(major);
    const minorIndex = this.map.locations[majorIndex].subLocations.findIndex(location => location.id == id);
    this.map.locations[majorIndex].subLocations[minorIndex].name = editedName;
  }
}
