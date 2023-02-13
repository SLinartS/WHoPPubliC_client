const dictionaryOfDaysOfTheWeek = {
  0: 'Пн',
  1: 'Вт',
  2: 'Ср',
  3: 'Чт',
  4: 'Пт',
  5: 'Сб',
  6: 'Вс',
};

export function getDayOfWeekByIndex(
  index: keyof typeof dictionaryOfDaysOfTheWeek,
) {
  return dictionaryOfDaysOfTheWeek[index];
}
