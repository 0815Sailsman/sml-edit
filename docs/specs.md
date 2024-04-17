# Specs
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
An **Area** is a broad, big and overarching region. It is made up of multiple smaller, logically separated **locations**.
If you have played one of the souls titles, you might recall the white text in the center of your screen upon reaching
a new area. This is what these areas are supposed to be.

But: These areas don't contain concrete objects. Areas are pretty much just a group of **locations**.

### Location
A **Location** is a logically and/or spatially bound and clearly defined region.
It has **Connections** to other **Locations** and may contain **Items**, **Enemies**, **Objects** and/or **NPCs**.

Example for Locations and Areas:
In Dark Souls I, the starting **Area** is the 'Nothern Undead Asylum'. You specifically start in a Prison Cell. This cell
is the perfect example for a **Location**, since it is connected to the hallway next to it by a door, that needs you to have
a certain **item** in your inventory to open. 

### Itemtype
An **Itemtype** is, as the name implies, a certain class of an **item** in programming terms. It contains general information
about the items it describes and may be used to, for example, later on stack multiple of the same itemtype onto one another. 

### Item
An **Item** is an actual instance of an **Itemtype**. It is a concrete thing that can be found somewhere or that can
be obtained in other ways.

Example for Itemtypes and Items:
There are lots of Titanite Shards spread throughout  the world of Dark Souls I. This means, there should be one itemtype
describing Titanite Shards in general, what their name is, later on their image and potentially other information
shared by all Titanite Shards. Concrete items of type Titanite Shard can then be bought by Andre for example, and you are
able to hold an arbitrary amount of them at the same time.

### OtherObject or sometimes also called object
Disclaimer: This may be reworked in the future, since bonfires are slightly difficult to model with this.

Other Objects are anything that doesn't fall into the category of **Items**, **Enemies** and **NPCs** but that still
appear in the world and can be interacted with. Great examples for this are any levers. Currently, this also includes bonfires
but that might change in the future.

## The .sml file format
The .sml file format contains structured json. The root object is the **map** object.

### Map
The map is the top object related to the game modeled.

**Keys:**
 - name: string
 - areas: **Area**[]
 - items: **ItemType**[]
