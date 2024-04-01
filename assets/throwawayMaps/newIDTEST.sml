{
  "name": "epic",
  "locations": [
    {
      "id": 0,
      "name": "Northern Undead Asylum",
      "subLocations": [
        {
          "id": 1,
          "name": "Starting Cell",
          "connections": [
            {
              "to": 1,
              "if": {
                "grammar": "A",
                "subConditions": [
                  {
                    "subjectType": "Location",
                    "subjectId": 1,
                    "verb": "visited",
                    "abbreviation": "A"
                  }
                ]
              }
            },
            {
              "to": 1
            }
          ],
          "items": [
            {
              "id": 0,
              "itemTypeID": 0,
              "count": 1
            }
          ],
          "enemies": [
            {
              "id": 0,
              "name": "enemyX",
              "souls": 100,
              "respawns": true,
              "drops": []
            },
            {
              "id": 1,
              "name": "el enemigo",
              "souls": "1234",
              "respawns": true,
              "drops": [
                {
                  "item": {
                    "id": 1,
                    "itemTypeID": 1,
                    "count": "5"
                  },
                  "chance": 100
                }
              ]
            }
          ],
          "objects": [
            {
              "id": 0,
              "name": "object69"
            },
            {
              "id": 1,
              "name": "bonfire"
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
                    "id": 2,
                    "itemTypeID": 0,
                    "count": 1
                  },
                  "count": "21",
                  "cost": "22"
                }
              ],
              "name": "testNPC"
            }
          ]
        },
        {
          "id": 1,
          "name": "newMinor",
          "connections": [],
          "items": [],
          "enemies": [],
          "objects": [],
          "npcs": []
        }
      ]
    },
    {
      "name": "newMajor",
      "subLocations": [
        {
          "id": 2,
          "name": "majorminor",
          "connections": [],
          "items": [],
          "enemies": [],
          "objects": [],
          "npcs": []
        }
      ],
      "id": 1
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
    }
  ]
}
