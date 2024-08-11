export function join(...name: string[]) {
  return name.join(' ')
}

export function cls(obj: Record<string, boolean>) {
  return Object.keys(obj).filter(key => obj[key]).join(' ')
}
