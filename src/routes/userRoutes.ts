import express from 'express';
import {
  addHolidaysToCalendar,
  getUserInfo,
  getUsers,
  registerUser,
} from '../controllers/userController.js';

export const router = express.Router();

router.get('/', getUsers);
router.get('/:userId/info', getUserInfo);
router.post('/:userId/calendar/holidays', addHolidaysToCalendar);
router.post('/auth', registerUser);
