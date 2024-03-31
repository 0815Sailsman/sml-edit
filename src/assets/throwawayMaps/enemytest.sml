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
            }
          ],
          "items": [
            {
              "id": 0,
              "name": "itemA",
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
              "id": 3,
              "name": "theEnemy",
              "souls": "100",
              "respawns": true,
              "drops": [
                {
                  "item": {
                    "id": 2,
                    "name": "myDrop",
                    "count": "2"
                  },
                  "chance": "100"
                }
              ]
            },
            {
              "id": 4,
              "name": "theEnemy",
              "souls": "100",
              "respawns": true,
              "drops": [
                {
                  "item": {
                    "id": 2,
                    "name": "myDrop",
                    "count": "2"
                  },
                  "chance": "100"
                }
              ],
              "if": {
                "grammar": "A",
                "subConditions": [
                  {
                    "subjectType": "Location",
                    "verb": "visited",
                    "subjectId": 1,
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
            }
          ],
          "npcs": [
            {
              "id": 0,
              "name": "jerma"
            }
          ]
        }
      ]
    }
  ]
}
