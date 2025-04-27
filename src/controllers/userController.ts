import { PrismaClient } from '../generated/prisma/index.js';
import { Response, Request } from 'express';
import { getPublicHolidays } from '../services/holidayService.js';
import { PublicHoliday } from '../services/services.interface';
import {
  AddHolidaysReqBody,
  AddHolidaysResBody,
  Calendar,
  GetUsersResBody,
  RegisterUserReqBody,
  RegisterUserResBody,
  UserInfoResBody,
} from './userController.interface.js';
import { filterHolidays } from '../utils/helpers/holidays.js';

const prisma = new PrismaClient();

export const registerUser = async (
  req: Request<object, object, RegisterUserReqBody>,
  res: Response<RegisterUserResBody>
): Promise<void> => {
  try {
    const { name, email } = req.body;
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      res.status(409).json({
        message: 'User already exists',
      });
      return;
    } else {
      const user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });

      res.status(201).json({
        message: 'User was created successfully',
        newUser: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server error. User was not registered',
      error: (error as Error).message,
    });
  }
};

export const getUserInfo = async (
  req: Request<{ userId: string }>,
  res: Response<UserInfoResBody>
): Promise<void> => {
  try {
    const { userId } = req.params;
    const userInfo = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        calendar: true,
      },
    });

    if (!userInfo) {
      res.status(404).json({
        message: 'User is not found',
      });
      return;
    }
    res.status(200).json({
      message: 'User Info was found successfully',
      userInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error. Not got user info',
      error: (error as Error).message,
    });
  }
};

export const getUsers = async (
  req: Request,
  res: Response<GetUsersResBody>
) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({
      message: 'Users were gotten successfully',
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error.',
      error: (error as Error).message,
    });
  }
};

export const addHolidaysToCalendar = async (
  req: Request<{ userId: string }, object, AddHolidaysReqBody>,
  res: Response<AddHolidaysResBody>
): Promise<void> => {
  try {
    const { countryCode, year, holidays } = req.body;
    const { userId } = req.params;

    const serverHolidays = await getPublicHolidays(year, countryCode);
    const filteredHolidays = filterHolidays(serverHolidays, holidays);
    const holidaysToCalendar = filteredHolidays.map((holiday) => {
      const { date, name } = holiday;
      return { date, name, countryCode };
    });

    const userExist = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!userExist) {
      res.status(404).json({
        message: 'User does not exist. Create user to try again.',
      });

      return;
    }

    const currentCalendar = await prisma.calendar.findUnique({
      where: {
        userId_year: { userId: Number(userId), year },
      },
      select: { holidays: true },
    });

    let newDBHolidays;

    if (!currentCalendar) {
      newDBHolidays = [...holidaysToCalendar];
      const newCalendar = await prisma.calendar.create({
        data: {
          userId: Number(userId),
          year,
          holidays: JSON.parse(JSON.stringify(newDBHolidays)),
        },
      });

      res.status(201).json({
        message: 'Calendar was created with necessary holidays.',
        userCalendar: newCalendar,
      });
      return;
    } else {
      newDBHolidays = (
        currentCalendar.holidays as unknown as PublicHoliday[]
      ).concat(holidaysToCalendar);
    }

    await prisma.calendar.update({
      where: {
        userId_year: { userId: Number(userId), year },
      },
      data: {
        holidays: JSON.parse(JSON.stringify(newDBHolidays)),
      },
    });

    const updatedUserCalendar = await prisma.calendar.findUnique({
      where: {
        userId_year: { userId: Number(userId), year },
      },
      select: {
        id: true,
        userId: true,
        year: true,
        holidays: true,
      },
    });

    res.status(200).json({
      message: 'Holidays were added successfully to calendar',
      userCalendar: updatedUserCalendar as Calendar,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error. Holidays were not added to Calendar',
      error: (error as Error).message,
    });
  }
};
