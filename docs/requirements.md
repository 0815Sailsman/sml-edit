# Requirements

This app should be able to:
- [x] parse sml files into a map object in memory
  - [x] unit test loader service
    - [x] unit- / Integration-test id service
      - [x] unit test extractor service
    - [x] unit test parser service
- [x] load sml files from disk
- [x] store sml files to disk from map object in memory

### Display
The contents of the map objects currently held in memory should be nicely displayed so that I as a User am able to see
what the model looks like.

- [x] display the name of the current map
- [x] display the available areas in the current map
  - [x] include the name of the area in the display
  - [x] include the ID of the area in the display
- [x] display the related locations in an area for each area
  - [x] include the name of the location in the display
  - [x] include the ID of the location in the display
- [x] display the related connections in a location for each location in an area
  - [x] display the target location of the connection
    - [x] display the name of the target location
    - [x] display the ID of the target location
  - [x] display the condition, under which the connection is available
- [x] display the related items in a location for each location in an area
  - [x] display the count of the item
  - [x] display the name of the itemtype
  - [x] display the ID of the Item
  - [x] display the location of the item
  - [x] display the condition, under which the item appears in the world
- [ ] display the related enemies in a location for each location in an area
  - [x] display the name of the enemy
  - [ ] display the souls an enemy drops on defeat
  - [ ] display whether an enemy respawns or not
  - [ ] display what an enemy drops
    - [ ] display the name of the dropped item
    - [ ] display the count of the dropped item
    - [ ] display the chance for the enemy to drop that item on defeat
  - [x] display the condition, under which the enemy appears in the world
- [x] display the related otherObjects in a location for each location in the world
  - [x] display the ID of the object
  - [x] display the name of the object
  - [x] display the condition, under which the object appears in the world
- [ ] display the related NPCs un a location for each location in the world
  - [x] display the ID of the NPC
  - [x] display the name of the NPC
  - [ ] display the shop inventory of the NPC
    - [ ] display the name of the sold item
    - [ ] display the count of the item in the NPCs inventory
    - [ ] display the cost of the item
  - [x] display the condition, under which the NPC appears in the world

#### Testing display
- [ ] e2e test all these with playwright ONCE WE HAVE A DESIGN!

### Adding
Adding in this context means being able to create a new object with reasonable effort,
it the being added to the map object at the correct place and it being displayed at
the correct place.

- [x] add areas to a map
- [x] add locations to an area
- [x] add connections to a location
- [x] add items to a location
- [x] add enemies to a location
- [x] add otherObjects to a location
- [x] add NPCs to a location

### Deleting
Deleting in this context means being able to remove an existing object and it then being removed
from the map object and it not being displayed anymore.

- [x] remove areas from a map
- [x] remove locations from an area
- [x] remove connections from a location
- [x] remove items from a location
- [x] remove enemies from a location
- [x] remove otherObjects from a location
- [x] remove NPCs from a location

### Editing
Editing in this context means being able to select an existing object, change its attributes
and to store those changes in the map object at the correct place. The object should then be displayed
correctly with its new attributes.

- [x] edit areas in a map
- [x] edit locations in an area
- [x] edit connections in a location
- [x] edit items in a location
- [x] edit enemies in a location
- [x] edit otherObjects in a location
- [x] edit NPCs edit a location 
