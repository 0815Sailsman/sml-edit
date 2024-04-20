# NPCs

NPCs are characterized by:
  - having questlines requiring actions and corresponding rewards
  - being able to talk to them (may affect questline)
  - being merchants (buying and selling may affect questline)
  - being able to appear at different spots in the world
  - unlocking / locking some of their merchant inventory based on certain criteria
  - dropping items based on their questline status when killed

examples:

**undead merchant in sewer**
- basic merchant, always selling the same stuff
- runs away when hit

this would not be modeled by creating a questline, but by just modeling her as like having a single hp and not
dropping anything. she would pretty much just die if you hit her.

**crestfallen warrior**
- basic questline, progressed through by killing certain enemies or possibly just talking to him
- the final step, where he becomes hollow and attacks you in new londo would just be modeled so, that after his final
quest step, the NPC version of him disappears and an enemy which has the criteria to only spawn when he has progressed so far
with his questline appears in the region that looks just like him and so on


## Modeling questlines
There will be certain items sold, that are unaffected by the questline status, so there shuld be a kind of "baseline"
merchant inventory, that is always available (as long as the NPC is alive...)

then you would have a questline editor, where you basically model every possible state the NPC can be in.
since the transitions between the states can't really be fluid, but are only triggered by doing some kind of active
reload, this matches the actual behaviour pretty well.  
In this editor, you would pretty much create a condition that has to be true for our NPC to be in that state,
and corresponding interactions, location, shop items and every other related stuff.

**NPC**:
  - id: number
  - name: string
  - states: NPCState[]

If no condition is set for a state, it will be considered as the "default" state.
**NPCState**:
  - id: number
  - description: string
  - condition: NPCStateCondition
  - sells: ShopItem[]
  - interactions: NPCInteraction[]

**ShopItem**:
  - itemType: ItemType
  - cost: number
  - count: number

**NPCStateCondition** extends condition:
now includes stuff like
  - NPCInteraction x triggered
  - NPCDecision y made
  - spent z souls here

**NPCDialog**:
  - id: number
  - content: string
  - availableIf: NPCStateCondition

**NPCDecision**:
  - id: number
  - question: string
  - possibleAnswers: NPCAnswer[]
  - availableIf: NPCStateCondition

**NPCAnswer**:
  - id: number
  - content: string

### Concrete example: Siegmeyer of Catarina

No shop inventory at all times

State 0:
  - available if: Gargoyles alive && Queelag alive 
