export type TCallbackType<T> = (
  searchParameter: keyof T,
  array: Array<T>,
) => boolean;
