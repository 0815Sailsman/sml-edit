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
              "id": 0,
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
              "name": "jerma",
              "shop": []
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
    }
  ]
}
