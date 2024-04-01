{
  "name": "epic",
  "locations": [
    {
      "id": 0,
      "name": "Northern Undead Asylum",
      "subLocations": [
        {
          "id": 0,
          "name": "Starting Cell",
          "connections": [
            {
              "to": 0,
              "if": {
                "grammar": "A",
                "subConditions": [
                  {
                    "subjectType": "Location",
                    "subjectId": 0,
                    "verb": "visited",
                    "abbreviation": "A"
                  }
                ]
              }
            }
          ],
          "items": [
            {
              "id": 0,
              "itemTypeID": 0,
              "count": 1
            },
            {
              "id": 4,
              "itemTypeID": 3,
              "count": "1",
              "if": {
                "grammar": "A",
                "subConditions": [
                  {
                    "subjectType": "Location",
                    "verb": "visited",
                    "subjectId": 0,
                    "abbreviation": "A"
                  }
                ]
              }
            }
          ],
          "enemies": [
            {
              "id": 1,
              "name": "enemyX",
              "souls": "1234",
              "respawns": true,
              "drops": [
                {
                  "item": {
                    "id": 1,
                    "itemTypeID": 1,
                    "count": "1"
                  },
                  "chance": 100
                }
              ],
              "if": {
                "grammar": "A",
                "subConditions": [
                  {
                    "subjectType": "Location",
                    "subjectId": 0,
                    "verb": "visited",
                    "abbreviation": "A"
                  }
                ]
              }
            },
            {
              "id": 2,
              "name": "senorPumba",
              "souls": "999",
              "respawns": false,
              "drops": [
                {
                  "item": {
                    "id": 2,
                    "itemTypeID": 2,
                    "count": "20"
                  },
                  "chance": 100
                }
              ],
              "if": {
                "grammar": "A",
                "subConditions": [
                  {
                    "subjectType": "Location",
                    "subjectId": 0,
                    "verb": "visited",
                    "abbreviation": "A"
                  },
                  {
                    "subjectType": "Enemy",
                    "subjectId": 1,
                    "verb": "killed",
                    "abbreviation": "A"
                  }
                ]
              }
            },
            {
              "id": 3,
              "name": "lasse",
              "souls": "1",
              "respawns": true,
              "drops": [
                {
                  "item": {
                    "id": 3,
                    "itemTypeID": 3,
                    "count": "1"
                  },
                  "chance": "1"
                }
              ],
              "if": {
                "grammar": "A || A",
                "subConditions": [
                  {
                    "subjectType": "Location",
                    "subjectId": 0,
                    "verb": "visited",
                    "abbreviation": "A"
                  },
                  {
                    "subjectType": "Enemy",
                    "subjectId": 1,
                    "verb": "killed",
                    "abbreviation": "A"
                  },
                  {
                    "subjectType": "Object",
                    "subjectId": 0,
                    "verb": "interacted with",
                    "abbreviation": "A"
                  }
                ]
              }
            }
          ],
          "objects": [
            {
              "id": 0,
              "name": "object69"
            },
            {
              "id": 1,
              "name": "fff",
              "if": {
                "grammar": "A",
                "subConditions": [
                  {
                    "subjectType": "Item",
                    "verb": "collected",
                    "subjectId": 3,
                    "abbreviation": "A"
                  }
                ]
              }
            }
          ],
          "npcs": [
            {
              "id": 0,
              "name": "jerma",
              "shop": []
            },
            {
              "id": 1,
              "shop": [
                {
                  "item": {
                    "id": 5,
                    "itemTypeID": 0,
                    "count": 1
                  },
                  "count": "11",
                  "cost": "1"
                }
              ],
              "name": "qwe",
              "if": {
                "grammar": "A",
                "subConditions": [
                  {
                    "subjectType": "Enemy",
                    "verb": "killed",
                    "subjectId": 2,
                    "abbreviation": "A"
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ],
  "items": [
    {
      "id": 0,
      "name": "itemA"
    },
    {
      "name": "weed",
      "id": 1
    },
    {
      "name": "pork",
      "id": 2
    },
    {
      "name": "gsupps",
      "id": 3
    }
  ]
}
