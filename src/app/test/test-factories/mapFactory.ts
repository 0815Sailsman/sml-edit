import { Map } from '../../map-management/map';
import {Area} from "../../model/area";
import {Location} from "../../model/location";
import {Connection} from "../../model/connection";
import {ConditionSubjects} from "../../builders/condition-builder/ConditionSubjects";
import {ConditionVerb} from "../../model/ConditionVerb";
import {Item} from "../../model/item";
import {Enemy} from "../../model/enemy";
import {OtherObject} from "../../model/otherObject";
import {NPC} from "../../model/NPC";
import {ItemType} from "../../model/itemType";

export function aComplexMapAsJSON(): string {
  return `
  {
    "name": "complexMap",
    "areas": [
      {
        "id": 0,
        "name": "area0",
        "locations": [{
          "id": 0,
          "name": "location0",
          "connections": [{
            "id": 0,
            "to": 1,
            "availableIf": {
              "grammar": "A",
              "subConditions": [{
                "subjectType": "Location",
                "subjectId": 0,
                "verb": "visited",
                "abbreviation": "A"
              }]
            }
          }],
          "items": [{
            "id": 0,
            "count": 1,
            "itemTypeID": 0,
            "availableIf": {
              "grammar": "B",
              "subConditions": [{
                "subjectType": "Location",
                "subjectId": 1,
                "verb": "visited",
                "abbreviation": "B"
              }]
            }
          }],
          "enemies": [{
            "id": 0,
            "name": "enemy0",
            "respawns": false,
            "drops": [],
            "souls": 1,
            "availableIf": {
              "grammar": "A",
              "subConditions": [{
                "subjectType": "Item",
                "subjectId": 0,
                "verb": "collected",
                "abbreviation": "A"
              }]
            }
          }],
          "objects": [{
            "id": 0,
            "name": "object0",
            "availableIf": {
              "grammar": "A && B",
              "subConditions": [{
                "subjectType": "Enemy",
                "subjectId": 0,
                "verb": "killed",
                "abbreviation": "A"
              }, {
                "subjectType": "Item",
                "subjectId": 0,
                "verb": "collected",
                "abbreviation": "B"
              }]
            }
          }],
          "npcs": [{
            "id": 0,
            "name": "NPC0",
            "shop": [],
            "availableIf": {
              "grammar": "A || B",
              "subConditions": [{
                "subjectType": "Location",
                "subjectId": 0,
                "verb": "visited",
                "abbreviation": "A"
              }, {
                "subjectType": "Location",
                "subjectId": 1,
                "verb": "visited",
                "abbreviation": "B"
              }]
            }
          }]
        }]
      },
      {
        "id": 1,
        "name": "area1",
        "locations": [{
          "id": 1,
          "name": "location1",
          "connections": [],
          "items": [],
          "enemies": [],
          "objects": [],
          "npcs": []
        }]
      }
    ],
    "items": [
      {
        "id": 0,
        "name": "itemTypeA"
      }
    ]
  }
  `;
}

export function aComplexMapAsObject(): any {
  return {
    name: "complexMap",
    areas: [
      {
        id: 0,
        name: "area0",
        locations: [{
          id: 0,
          name: "location0",
          connections: [{
            id: 0,
            to: 1,
            availableIf: {
              grammar: "A",
              subConditions: [{
                subjectType: "Location",
                subjectId: 0,
                verb: "visited",
                abbreviation: "A"
              }]
            }
          }],
          items: [{
            id: 0,
            count: 1,
            itemTypeID: 0,
            availableIf: {
              grammar: "B",
              subConditions: [{
                subjectType: "Location",
                subjectId: 1,
                verb: "visited",
                abbreviation: "B"
              }]
            }
          }],
          enemies: [{
            id: 0,
            name: "enemy0",
            respawns: false,
            drops: [],
            souls: 1,
            availableIf: {
              grammar: "A",
              subConditions: [{
                subjectType: "Item",
                subjectId: 0,
                verb: "collected",
                abbreviation: "A"
              }]
            }
          }],
          objects: [{
            id: 0,
            name: "object0",
            availableIf: {
              grammar: "A && B",
              subConditions: [{
                subjectType: "Enemy",
                subjectId: 0,
                verb: "killed",
                abbreviation: "A"
              }, {
                subjectType: "Item",
                subjectId: 0,
                verb: "collected",
                abbreviation: "B"
              }]
            }
          }],
          npcs: [{
            id: 0,
            name: "NPC0",
            shop: [],
            availableIf: {
              grammar: "A || B",
              subConditions: [{
                subjectType: "Location",
                subjectId: 0,
                verb: "visited",
                abbreviation: "A"
              }, {
                subjectType: "Location",
                subjectId: 1,
                verb: "visited",
                abbreviation: "B"
              }]
            }
          }]
        }]
      },
      {
        id: 1,
        name: "area1",
        locations: [{
          id: 1,
          name: "location1",
          connections: [],
          items: [],
          enemies: [],
          objects: [],
          npcs: []
        }]
      }
    ],
    items: [
      {
        id: 0,
        name: "itemTypeA"
      }
    ]
  };
}

export function aComplexMapAsParsedAndActualMap(): Map {
    return new Map(
      "complexMap",
      [
        new Area(
          0,
          "area0",
          [new Location(
            0,
            "location0",
            [new Connection(
              0,
              1,
              {
                grammar: "A",
                subConditions: [{
                  subjectType: ConditionSubjects.Location,
                  subjectId: 0,
                  verb: ConditionVerb.VISITED,
                  abbreviation: "A"
                }]
              }
            )],
            [new Item(
              0,
              0,
              1,
              {
                grammar: "B",
                subConditions: [{
                  subjectType: ConditionSubjects.Location,
                  subjectId: 1,
                  verb: ConditionVerb.VISITED,
                  abbreviation: "B"
                }]
              }
            )],
            [new Enemy(
              0,
              "enemy0",
              1,
              false,
              [],
              {
                grammar: "A",
                subConditions: [{
                  subjectType: ConditionSubjects.Item,
                  subjectId: 0,
                  verb: ConditionVerb.COLLECTED,
                  abbreviation: "A"
                }]
              }
            )],
            [new OtherObject(
              0,
              "object0",
              {
                grammar: "A && B",
                subConditions: [{
                  subjectType:ConditionSubjects.Enemy,
                  subjectId: 0,
                  verb: ConditionVerb.KILLED,
                  abbreviation: "A"
                }, {
                  subjectType: ConditionSubjects.Item,
                  subjectId: 0,
                  verb: ConditionVerb.COLLECTED,
                  abbreviation: "B"
                }]
              }
            )],
            [new NPC(
              0,
              "NPC0",
              [],
              {
                grammar: "A || B",
                subConditions: [{
                  subjectType: ConditionSubjects.Location,
                  subjectId: 0,
                  verb: ConditionVerb.VISITED,
                  abbreviation: "A"
                }, {
                  subjectType: ConditionSubjects.Location,
                  subjectId: 1,
                  verb: ConditionVerb.VISITED,
                  abbreviation: "B"
                }]
              }
            )]
          )]
        ),
        new Area(
          1,
          "area1",
          [new Location(
            1,
            "location1",
            [],
            [],
            [],
            [],
            []
          )]
        )
      ],
      [new ItemType(
        0,
        "itemTypeA"
      )]
    );
}
