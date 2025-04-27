import {
  Country,
  CountryInfo,
  YearPopulation,
} from '../services/services.interface';

export interface AvailableCountriesResBody {
  message: string;
  availableCountries?: Country[];
  error?: string;
}

export interface CountryInfoReqBody {
  countryCode: string;
  countryName: string;
}

export interface CountryFullInfo {
  borders: CountryInfo[] | null;
  population: YearPopulation[];
  flagUrl: string;
}

export interface CountryInfoResBody {
  message: string;
  countryInfo?: CountryFullInfo;
  error?: string;
}
