const dictionaryOfDaysOfTheWeek = {
  0: 'Понедельник',
  1: 'Вторник',
  2: 'Среда',
  3: 'Четверг',
  4: 'Пятница',
  5: 'Суббота',
  6: 'Воскресенье',
};

export function getDayOfWeekByIndex(
  index: keyof typeof dictionaryOfDaysOfTheWeek,
) {
  return dictionaryOfDaysOfTheWeek[index];
}