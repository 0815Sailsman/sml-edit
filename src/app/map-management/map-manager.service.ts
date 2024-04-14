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

  // THIS WORKS, BECAUSE WE DON'T MIX DIFFERENT TYPES
  createOrUpdateGeneralObjectFromLocationInArea(
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
    // @ts-ignore
    const objectIndex = this.map.areas[areaIndex].locations[locationIndex][key].findIndex(oldObject => oldObject.id == theObject.id);
    console.log(theObject);
    console.log(objectIndex);
    if (objectIndex !== -1) {
      this.map.areas[areaIndex].locations[locationIndex][key][objectIndex] = theObject;
    } else {
      // @ts-ignore
      this.map.areas[areaIndex].locations[locationIndex][key].push(theObject);
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
            case ConditionSubjects.Location: result += this.locationById(localCondition.subjectId).toString();break;
            case ConditionSubjects.Item: result += this.itemByID(localCondition.subjectId).toString(this);break;
            case ConditionSubjects.Enemy: result += this.enemyById(localCondition.subjectId).toString(this);break;
            case ConditionSubjects.OtherObject: result += this.otherObjectById(localCondition.subjectId).toString();break;
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
// returns the id of the newly created itemtype
  addItemTypeWithName(newItemTypeName: string | undefined): number | undefined {
    if (newItemTypeName !== undefined) {
      const newID: number = this.idService.nextItemTypeID();
      this.map.items.push(new ItemType(
        newID,
        newItemTypeName
      ));
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

  locationOfItemWithID(itemId: number): Location | undefined {
    const allLocationsWithItemId = this.extractor.allLocations(this.map)
      .filter(location => location.items.map(item => item.id).includes(itemId));
    if (allLocationsWithItemId.length > 0) {
      return allLocationsWithItemId[0];
    }
    return undefined;
  }

  enemyDroppingItemWithID(itemId: number): Enemy | undefined {
    const allEnemiesWithDropWithItemId = this.extractor.allEnemies(this.map)
      .filter(enemy => enemy.drops.map(drop => drop.item.id).includes(itemId));
    if (allEnemiesWithDropWithItemId.length > 0) {
      return allEnemiesWithDropWithItemId[0];
    }
    return undefined;
  }

  npcSellingItemWithID(itemId: number): NPC | undefined {
    const allNPCsSellingItemWithId = this.extractor.allNPCs(this.map)
      .filter(npc => npc.shop.map(offer => offer.item.id).includes(itemId));
    if (allNPCsSellingItemWithId.length > 0) {
      return allNPCsSellingItemWithId[0];
    }
    return undefined;
  }

  locationOfEnemyWithID(enemyId: number): Location | undefined {
    const allLocationsWithEnemyId = this.extractor.allLocations(this.map)
      .filter(location => location.enemies.map(enemy => enemy.id).includes(enemyId));
    if (allLocationsWithEnemyId.length > 0) {
      return allLocationsWithEnemyId[0];
    }
    return undefined;
  }
}
