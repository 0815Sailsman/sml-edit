export interface OtherObject {
  name: string
}

export function otherObjectToString(object: OtherObject | undefined): string {
  if (object == undefined) {
    return "undefined"
  }
  return object.name
}
