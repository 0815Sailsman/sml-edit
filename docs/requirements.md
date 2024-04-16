# Requirements
Documenting, what this app should do and/or be capable of doing.

## Abstract
SML-Edit is part of the SL-Route toolchain. It is the first of three apps and has the task of building and editing .sml files.
These files contain a game's content, logically connected and modeled. It was initially just intended for Dark Souls Remastered,
but it became clear quickly, that this app will be able to be used to model other souls-like titles as well.

The idea behind the SL-Route toolchain is, that you will be able to 
1. **model** your favourite games with SML-Edit
2. **route** a run through your model with SL-Route
3. **play** the run, guided by the route information in SL-Nav

## Glossary
Explaining the different terms that appear throughout the project, to have one source of truth for what a name means.

### Area

### Location

### Itemtype

### Item

## The .sml file format
The .sml file format contains structured json. The root object is the **map** object.

### Map
The map is the top object related to the game modeled.

**Keys:**
 - name: string
 - areas: **Area**[]
 - items: **ItemType**[]
