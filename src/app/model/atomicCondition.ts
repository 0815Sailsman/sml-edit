import {ConditionSubjects} from "../builders/condition-builder/ConditionSubjects";
import {ConditionVerb} from "./ConditionVerb";

export interface AtomicCondition {
  subjectType: ConditionSubjects
  subjectId: number
  verb: ConditionVerb
  abbreviation: string
}
