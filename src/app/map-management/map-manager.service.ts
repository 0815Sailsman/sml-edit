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

@Injectable({
  providedIn: 'root'
})
export class MapManagerService {

  constructor(private mapLoaderService: FromFileMapLoaderService) { }

  map: Map = this.mapLoaderService.load();
  idCounter: number = 1

  deleteMajorLocation(theLocation: MajorLocation) {
    this.map.locations = this.map.locations.filter(location => location !== theLocation)
  }

  addMajorLocationWithName(theName: string) {
    let newMajorLocation:MajorLocation = {
      name: theName,
      subLocations: [],
      id: ++this.idCounter
    }
    this.map.locations.push(newMajorLocation)
  }

  addMinorLocationTo(majorLocation: MajorLocation, theName: string) {
    let newMinorLocation: Location = {
      id: ++this.idCounter,
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
    return this.map.locations.flatMap(major => major.subLocations);
  }

  minorLocationById(id: number): Location {
    return this.allMinorLocations().filter(value => value.id == id)[0]
  }

  allItems(): Item[] {
    return this.allMinorLocations().flatMap(minor => minor.items)
  }
  itemById(id: number): Item {
    return this.allItems().filter(value => value.id == id)[0]
  }

  allEnemies(): Enemy[] {
    return this.allMinorLocations().flatMap(minor => minor.enemies)
  }

  enemyById(id: number): Enemy {
    return this.allEnemies().filter(value => value.id == id)[0]
  }

  allNPCs(): NPC[] {
    return this.allMinorLocations().flatMap(minor => minor.npcs)
  }

  allOtherObjects(): OtherObject[] {
    return this.allMinorLocations().flatMap(minor => minor.objects)
  }

  otherObjectById(id: number): OtherObject {
    return this.allOtherObjects().filter(value => value.id == id)[0]
  }

  createConnectionFromLocation(major: MajorLocation | undefined, from: Location | undefined, connection: Connection | undefined) {
    if (from === undefined || connection === undefined || major === undefined) {
      return;
    }
    const majorIndex = this.map.locations.indexOf(major);
    const minorIndex = this.map.locations[majorIndex].subLocations.indexOf(from)
    this.map.locations[majorIndex].subLocations[minorIndex].connections.push(connection)
  }

  createItemInLocation(major: MajorLocation | undefined, location: Location | undefined, item: Item | undefined) {
    if (major === undefined || location === undefined || item === undefined) {
      return;
    }
    const majorIndex = this.map.locations.indexOf(major);
    const minorIndex = this.map.locations[majorIndex].subLocations.indexOf(location);
    this.map.locations[majorIndex].subLocations[minorIndex].items.push(item);
  }

  createEnemyInLocation(major: MajorLocation | undefined, location: Location | undefined, enemy: Enemy | undefined) {
    if (major === undefined || location === undefined || enemy === undefined) {
      return;
    }
    const majorIndex = this.map.locations.indexOf(major);
    const minorIndex = this.map.locations[majorIndex].subLocations.indexOf(location);
    this.map.locations[majorIndex].subLocations[minorIndex].enemies.push(enemy);
  }

  createObjectInLocation(major: MajorLocation | undefined, location: Location | undefined, object: OtherObject | undefined) {
    if (major === undefined || location === undefined || object === undefined) {
      return;
    }
    const majorIndex = this.map.locations.indexOf(major);
    const minorIndex = this.map.locations[majorIndex].subLocations.indexOf(location);
    this.map.locations[majorIndex].subLocations[minorIndex].objects.push(object);
  }

  createNPCInLocation(major: MajorLocation | undefined, location: Location | undefined, npc: NPC | undefined) {
    if (major === undefined || location === undefined || npc === undefined) {
      return;
    }
    const majorIndex = this.map.locations.indexOf(major);
    const minorIndex = this.map.locations[majorIndex].subLocations.indexOf(location);
    this.map.locations[majorIndex].subLocations[minorIndex].npcs.push(npc);
  }

  conditionToString(condition: BigCondition | undefined): string {
    if (condition === undefined) {
      return "";
    }
    return condition.grammar
      .split(' ')
      .map(wordInGrammar => {
        const ascii = wordInGrammar.charCodeAt(0)
        if (ascii >= 65 && ascii <= 90) {
          const localCondition = condition.subConditions.find(atomicCondition => atomicCondition.abbreviation.charCodeAt(0) == ascii)!
          let result = "";
          result += localCondition?.subjectType + " "
          switch (localCondition?.subjectType) {
            case ConditionSubjects.Location: result += this.minorLocationById(localCondition.subjectId).name;break;
            case ConditionSubjects.Item: result += this.itemById(localCondition.subjectId).name;break;
            case ConditionSubjects.Enemy: result += this.enemyById(localCondition.subjectId).name;break;
            case ConditionSubjects.OtherObject: result += this.otherObjectById(localCondition.subjectId).name;break;
          }
          return result + " has been " + verbFor(localCondition.subjectType);
        } else {
          return wordInGrammar
        }
      })
      .join(' ');
  }
}
