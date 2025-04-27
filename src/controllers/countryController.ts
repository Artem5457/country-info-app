import { Request, Response } from 'express';
import {
  getAvailableCountries,
  getBorderCountries,
  getCountryFlag,
  getPopulation,
} from '../services/countryService.js';
import {
  AvailableCountriesResBody,
  CountryInfoReqBody,
  CountryInfoResBody,
} from './countryController.interface.js';

export const getAvailCountries = async (
  req: Request,
  res: Response<AvailableCountriesResBody>
): Promise<void> => {
  try {
    const availableCountries = await getAvailableCountries();

    res.status(200).json({
      message: 'Countries got successfully',
      availableCountries,
    });
  } catch (error) {
    res.status(502).json({
      message: 'Bad Gateway. Not get countries',
      error: (error as Error).message,
    });
  }
};

export const getCountryInfo = async (
  req: Request<object, object, CountryInfoReqBody>,
  res: Response<CountryInfoResBody>
): Promise<void> => {
  try {
    const { countryCode, countryName } = req.body;
    const [borders, population, flagUrl] = await Promise.all([
      getBorderCountries(countryCode),
      getPopulation(countryName),
      getCountryFlag(countryCode),
    ]);

    res.status(200).json({
      message: 'Country info got successfully',
      countryInfo: {
        borders,
        population,
        flagUrl,
      },
    });
  } catch (error) {
    res.status(502).json({
      message: 'Bad Gateway. Not get country info',
      error: (error as Error).message,
    });
  }
};
