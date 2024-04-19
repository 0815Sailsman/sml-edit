# Requirements

This app should be able to:
- [x] parse sml files into a map object in memory
  - [ ] unit test loader service
    - [x] unit- / Integration-test id service
      - [x] unit test extractor service
    - [x] unit test parser service
- [x] display the contents of a map object
- [x] load sml files from disk
- [x] store sml files to disk from map object in memory

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
