{
  "name": "epic cum",
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
    }
  ]
}