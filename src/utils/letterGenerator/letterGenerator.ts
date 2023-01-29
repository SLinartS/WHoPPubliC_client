export function letterGenerator() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for (let i = 0; i < 1; i += 1) {
    result += characters[Math.floor(Math.random() * charactersLength)];
  }
  return result;
}
