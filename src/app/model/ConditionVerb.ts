import {ConditionSubjects} from "../builders/condition-builder/ConditionSubjects";

export enum ConditionVerb {
  VISITED = "visited",
  COLLECTED = "collected",
  KILLED = "killed",
  INTERACTED = "interacted with"
}

export function verbFor(type: ConditionSubjects): ConditionVerb {
  switch (type) {
    case "Location": return ConditionVerb.VISITED
    case "Item": return ConditionVerb.COLLECTED
    case "Enemy": return ConditionVerb.KILLED
    case "Object": return ConditionVerb.INTERACTED
  }
  throw new Error('Could not match condition subject to a verb!')
}
