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
                "grammar": "",
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
              "to": 4,
              "if": {
                "grammar": "B && A",
                "subConditions": [
                  {
                    "subjectType": "Enemy",
                    "verb": "killed",
                    "subjectId": 0,
                    "abbreviation": "A"
                  },
                  {
                    "subjectType": "Item",
                    "verb": "collected",
                    "subjectId": 0,
                    "abbreviation": "B"
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
    },
    {
      "name": "Major 2",
      "subLocations": [
        {
          "id": 4,
          "name": "sublocation 2 A",
          "connections": [],
          "items": [],
          "enemies": [],
          "objects": [],
          "npcs": []
        }
      ],
      "id": 2
    },
    {
      "name": "Major 3",
      "subLocations": [],
      "id": 3
    }
  ]
}
