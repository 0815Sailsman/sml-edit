# SMLEdit
Part 1/3 of the sl-route toolchain. Current deployment [here](https://0815sailsman.github.io/sml-edit/)

## HOW TO DEPLOY
just run
  npm run deploy
locally and wait 1 minute :thumbsup:

## Technical details / Data structure / architecture
The top level object is our **map**.
The idea is to first of all, have a rough overview over the map with our collection of **areas**, currently still called major locations.
Another field in the **map** object is the **items** array. All **items** are declared right here and only referenced by their ID later on
(NOTE: Right here items only consist of a name and an ID. Later on, when creating actual instances of them in the **areas** they also get a count and a condition).
Each **area** gets divided into **locations**, currently called minor locations, that logically divide the **area** through doors, fog-walls or similar blockers.
Each **location** may have any amount of
 - **connections** to other **locations** that may only be available under a certain condition.
 - **items**, modeled by selecting an item-type from the root items-object, a count and a condition.
 - **enemies**. They have a name, drop some souls, may respawn, spawn under a condition and can drop some items (either guaranteed or by chance). The items should also be selected from the root items-object. You add a count and specify, if it always drops.
 - **objects** with arbitrary interaction possibilities. This will probably be the hardest thing to model later on. Maybe start out with just being able to interact once with every object to later be able to use them in conditions.
 - **npcs**. They will also be relatively complex, having different quest-progress states changing their locations, interactions and shop-inventory. Also simplify for now to single state -> just make them have a shop.

## Roadmap for 0.2.0 - The big refactoring & some QOL
- [x] wrap shop item builder in own component
- [x] Make map objects classes with easily-selectable interface implemented
  - [x] map from interface to class
  - [x] area from interface to class
  - [x] location from interface to class
  - [x] connection from interface to class
  - [x] item from interface to class
  - [x] enemy from interface to class
  - [x] otherObject from interface to class
  - [x] NPC from interface to class
  - [x] easily selectable from type union to interface
  - [x] don't use weird passing of functions in location card component anymore for to string
- [x] Move toString methods to related classes
- [x] list of available connections doesn't show a connection just by saying its id => use name of 'to' instead!
- [ ] de-generalize object manager into different components (MAYBE)
- [ ] unify createOrUpdate Pipeline
- [ ] move related files to new utils directory in sources root

## Roadmap for 0.3.0 - Docs, specs and testing
- [ ] Written down concrete specs and requirements for this app
- [ ] Write tests for these requirements

## Feature backlog
- [ ] OtherObject with type constraints -> not anything, but select from collection of bonfire, lever etc. with fix interactions
- [ ] Quest-Line modeling for npcs with interactions
- [ ] Restrict inputs that logically should only accept numbers to actually only accept numbers

## Possible Spikes
- [x] Rely more on dependency injection -> Reduce unnecessary event bubbling up and just straight up inject map manager service (e.g. on object creation). But watch out: Might not be possible everywhere, since we may need to know details only known on higher locations.
- [ ] Use forms
- [ ] Create from existing object as template
- [x] Possibly split different IDs
- [ ] Meta tags and info-dump in root of sml file
- [ ] do we really need this 'bubbling', now that the IDs are clear? -> updating minor stuff without reference to major
- [ ] work with dev preview conditional templating
- [x] unify create and update methods in map-manager service and upstream event stuff

## Known Bugs


# Archive
Past roadmaps etc

## Roadmap for 0.1.0
- [x] Revamp item system
- [x] Revamp ID system
- [x] Rework map loading
- [x] load existing atomic conditions into corresponding builder on map load
- [x] Edit functionality
  - [x] edit major location name
  - [x] edit minor location name
  - [x] edit connection
    - [x] connection needs ID
  - [x] edit items
  - [x] edit enemies
    - [x] edit drops
    - [x] pass starting conditions
  - [x] edit other objects
  - [x] edit NPCs
    - [x] edit shop items
- [x] clear builders on create / confirm edit actions
  - [x] connection builder
  - [x] item builder
  - [x] enemy builder
  - [x] otherObject builder
  - [x] NPC builder
- [x] Change area / location naming scheme
  - [x] majorLocation to area
  - [x] minorLocation to location
- [x] select from all doesn't show enough information
  - too specific requirement, will change with design, so skip for this alpha
- [x] make condition clearable
- [x] generally clear fields on create and update
- [x] Stop using === equality for objects in map manager and switch to ID equality

## Fixed bugs
- [x] Loading maps doesn't update MapManagement ID Counter
- [x] Can't create connections (probably also other Objects) without conditions
- [x] Loading conditions from save doesn't  update abbreviation counter in condition builder
- [x] loading connections doesn't work after ID introduction
- [x] item builder change detection fires always on change during edit, possibly also other builder -> might be fixed due to editing flag
- [x] update connection seems bugged
- [x] deep copy condtions in builders to avoid weird references after clearing
