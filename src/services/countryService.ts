import axios from 'axios';
import {
  Country,
  CountryFlag,
  CountryInfo,
  CountryPopulation,
  YearPopulation,
} from './services.interface';

export async function getAvailableCountries(): Promise<Country[]> {
  const response = await axios.get<Country[]>(
    `${process.env.NAGER_BASE}/AvailableCountries`
  );
  return response.data;
}

export async function getBorderCountries(
  countryCode: string
): Promise<CountryInfo[] | null> {
  const response = await axios.get<CountryInfo>(
    `${process.env.NAGER_BASE}/CountryInfo/${countryCode}`
  );

  return response.data.borders;
}

export async function getPopulation(
  countryName: string
): Promise<YearPopulation[]> {
  const response = await axios.post<{ data: CountryPopulation }>(
    `${process.env.COUNTRIES_NOW_BASE}/countries/population`,
    {
      country: countryName,
    }
  );

  return response.data.data.populationCounts;
}

export async function getCountryFlag(countryCode: string): Promise<string> {
  const response = await axios.post<{ data: CountryFlag }>(
    `${process.env.COUNTRIES_NOW_BASE}/countries/flag/images`,
    {
      iso2: countryCode,
    }
  );

  return response.data.data.flag;
}
