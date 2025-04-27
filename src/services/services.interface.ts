export interface Country {
  countryCode: string;
  name: string;
}

export interface YearPopulation {
  year: number;
  value: number;
}

export interface CountryPopulation {
  populationCounts: YearPopulation[];
}

export interface CountryInfo {
  borders: CountryInfo[] | null;
}

export interface CountryFlag {
  name: string;
  flag: string;
}

export interface PublicHoliday {
  date: string;
  name: string;
}
