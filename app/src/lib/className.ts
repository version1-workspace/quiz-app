export function join(...name: string[]) {
  return name.join(" ");
}

export function cls(obj: Record<string, boolean | undefined>) {
  return Object.keys(obj)
    .filter((key) => obj[key])
    .join(" ");
}
