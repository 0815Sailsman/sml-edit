import {ConditionSubjects} from "../condition-builder/ConditionSubjects";
import {ConditionVerb} from "../types/ConditionVerb";

export interface AtomicCondition {
  subjectType: ConditionSubjects
  subjectId: number
  verb: ConditionVerb
  abbreviation: string
}
