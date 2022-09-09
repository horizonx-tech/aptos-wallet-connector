export const toStringRecursive = (arg: any): any => {
  if (Array.isArray(arg)) return arg.map(toStringRecursive)
  return `${arg}`
}
