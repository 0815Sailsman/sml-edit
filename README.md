# SMLEdit

## Possible Spikes
 -[ ] Rely more on dependency injection -> Reduce unnecessary event bubbling up and just straight up inject map manager service (e.g. on object creation). But watch out: Might not be possible everywhere, since we may need to know details only known on higher locations.

## Known Bugs
 -[ ] Loading maps doesn't update MapManagement ID Counter
 -[x] Can't create connections (probably also other Objects) without conditions
