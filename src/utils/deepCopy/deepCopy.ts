export default function deepCopy<T>(arg: T | T): T {
  return JSON.parse(JSON.stringify(arg));
}
