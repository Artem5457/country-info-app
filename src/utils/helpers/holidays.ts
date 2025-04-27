import { PublicHoliday } from '../../services/services.interface';

export function filterHolidays(
  allHolidays: PublicHoliday[],
  selectedHolidays: string[] = []
): PublicHoliday[] {
  if (selectedHolidays.length === 0) {
    return [];
  }

  const filteredHolidays = allHolidays.filter((holiday) =>
    selectedHolidays.includes(holiday.name)
  );

  return filteredHolidays;
}
