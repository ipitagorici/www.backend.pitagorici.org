export function areArraysEqual<T, U>(first: T[], second: U[]): boolean {
  return JSON.stringify(first) === JSON.stringify(second)
}