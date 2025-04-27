import express from 'express';
import {
  getAvailCountries,
  getCountryInfo,
} from '../controllers/countryController.js';

export const router = express.Router();

router.get('/available', getAvailCountries);
router.post('/info', getCountryInfo);
