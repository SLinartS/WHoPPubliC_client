export function camelToKebab(string: string): string {
  return string.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}
