/**
 * Date utility functions
 */

/**
 * Pads a number to two digits
 * @param {number} num
 * @returns {string}
 */
const pad = (num) => num.toString().padStart(2, '0');

/**
 * Formats a date according to the specified format
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  if (!(date instanceof Date)) return '';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return format
    .replace('YYYY', year)
    .replace('YY', year.toString().slice(-2))
    .replace('MM', pad(month))
    .replace('M', month)
    .replace('DD', pad(day))
    .replace('D', day)
    .replace('HH', pad(hours))
    .replace('H', hours)
    .replace('mm', pad(minutes))
    .replace('m', minutes)
    .replace('ss', pad(seconds))
    .replace('s', seconds);
};

/**
 * Calculates the difference between two dates in a given unit
 */
export const dateDiff = (date1, date2, unit = 'days') => {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) return null;

  const diffMs = Math.abs(date2 - date1);

  const conversions = {
    years: 1000 * 60 * 60 * 24 * 365.25,
    months: 1000 * 60 * 60 * 24 * 30.44,
    days: 1000 * 60 * 60 * 24,
    hours: 1000 * 60 * 60,
    minutes: 1000 * 60,
    seconds: 1000
  };

  return Math.floor(diffMs / (conversions[unit] || conversions.days));
};

/**
 * Generates a calendar grid for a given month
 */
export const generateCalendar = (year = new Date().getFullYear(), month = new Date().getMonth()) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  const calendar = Array.from({ length: 6 }, () => Array(7).fill(null));
  let currentDay = 1;

  for (let week = 0; week < 6; week++) {
    for (let day = 0; day < 7; day++) {
      if ((week === 0 && day < startDayOfWeek) || currentDay > daysInMonth) continue;
      calendar[week][day] = currentDay++;
    }
  }

  return calendar;
};

/**
 * Adds days to a date
 */
export const addDays = (date, days) => new Date(date.getTime() + days * 86400000);

/**
 * Adds months to a date
 */
export const addMonths = (date, months) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

/**
 * Adds years to a date
 */
export const addYears = (date, years) => {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
};

/**
 * Checks if a year is a leap year
 */
export const isLeapYear = (year) => (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));

/**
 * Returns number of days in a month
 */
export const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

/**
 * Checks if a date falls on a weekend
 */
export const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

/**
 * Returns ISO week number
 */
export const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

/**
 * Gets the start of the week (Sunday by default)
 */
export const startOfWeek = (date, startDay = 0) =>
