import { JsonValue } from '../generated/prisma/runtime/library';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface RegisterUserResBody {
  message: string;
  newUser?: User;
  error?: string;
}

export interface RegisterUserReqBody {
  name: string;
  email: string;
}

export interface Calendar {
  id: number;
  userId: number;
  year: number;
  holidays: JsonValue;
}

export interface UserInfo extends User {
  calendar: Calendar[];
}

export interface UserInfoResBody {
  message: string;
  userInfo?: UserInfo;
  error?: string;
}

export interface GetUsersResBody {
  message: string;
  users?: User[];
  error?: string;
}

export interface AddHolidaysReqBody {
  countryCode: string;
  year: number;
  holidays: string[];
}

export interface AddHolidaysResBody {
  message: string;
  userCalendar?: Calendar;
  error?: string;
}
