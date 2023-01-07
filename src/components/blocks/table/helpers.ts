export function addBorderRadius(index: number, length: number): string {
  if (index === 0) {
    return 'table__column-shell--first';
  }
  if (index === length - 1) {
    return 'table__column-shell--last';
  }
  return '';
}
