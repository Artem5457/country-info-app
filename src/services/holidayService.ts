import axios from 'axios';
import { PublicHoliday } from './services.interface';

export async function getPublicHolidays(
  year: number,
  countryCode: string
): Promise<PublicHoliday[]> {
  const response = await axios.get<PublicHoliday[]>(
    `${process.env.NAGER_BASE}/PublicHolidays/${year}/${countryCode}`
  );

  return response.data;
}
