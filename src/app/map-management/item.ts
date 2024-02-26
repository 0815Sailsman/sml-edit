export interface Item {
  name: string
}

export function itemToString(item: Item | undefined): string {
  if (item == undefined) {
    return "undefined"
  }
  return item.name;
}
