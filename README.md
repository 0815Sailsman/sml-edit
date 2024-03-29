# SMLEdit

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
