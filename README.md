# SMLEdit

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
 - **npcs**. They will also be relatively complex, having different quest-progress states changing their locations, interactions and shop-inventory. Also simplify for now.

## Fix TODOs
 -[ ] Revamp item system
 -[ ] Change area / location naming scheme

## Possible Spikes
 -[ ] Rely more on dependency injection -> Reduce unnecessary event bubbling up and just straight up inject map manager service (e.g. on object creation). But watch out: Might not be possible everywhere, since we may need to know details only known on higher locations.
 -[ ] Use forms
 -[ ] Create from existing object as template

## Known Bugs
 -[ ] Loading maps doesn't update MapManagement ID Counter
 -[x] Can't create connections (probably also other Objects) without conditions
 -[ ] Restrict inputs that logically should only accept numbers to actually only accept numbers