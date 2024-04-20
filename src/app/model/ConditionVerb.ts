import {ConditionSubjects} from "../builders/condition-builder/ConditionSubjects";

export enum ConditionVerb {
  VISITED = "has been visited",
  COLLECTED = "has been collected",
  ALIVE= "is alive",
  KILLED = "has been killed",
  INTERACTED = "has been interacted with"
}

export function DEPRECATEDverbFor(type: ConditionSubjects): ConditionVerb {
  switch (type) {
    case "Location": return ConditionVerb.VISITED
    case "Item": return ConditionVerb.COLLECTED
    case "Enemy": return ConditionVerb.KILLED
    case "Object": return ConditionVerb.INTERACTED
  }
  throw new Error('Could not match condition subject to a verb!')
}

export function verbsFor(type: ConditionSubjects): ConditionVerb[] {
  switch (type) {
    case "Location": return [ConditionVerb.VISITED]
    case "Item": return [ConditionVerb.COLLECTED]
    case "Enemy": return [ConditionVerb.ALIVE, ConditionVerb.KILLED]
    case "Object": return [ConditionVerb.INTERACTED]
  }
  throw new Error('Could not match condition subject to any verbs!')
}
