// test/date.test.js
import { date } from '../src/index.js';

describe('Date Utilities', () => {
  describe('formatDate', () => {
    it('should format dates according to the specified format', () => {
      const testDate = new Date(2023, 0, 15, 14, 30, 45); // Jan 15, 2023, 14:30:45
      
      expect(date.formatDate(testDate, 'YYYY-MM-DD')).toBe('2023-01-15');
      expect(date.formatDate(testDate, 'MM/DD/YYYY')).toBe('01/15/2023');
      expect(date.formatDate(testDate, 'DD.MM.YY')).toBe('15.01.23');
      expect(date.formatDate(testDate, 'HH:mm:ss')).toBe('14:30:45');
      expect(date.formatDate(testDate, 'YYYY-MM-DD HH:mm:ss')).toBe('2023-01-15 14:30:45');
      expect(date.formatDate(testDate, 'M/D/YYYY')).toBe('1/15/2023');
      expect(date.formatDate(testDate, 'H:m:s')).toBe('14:30:45');
    });
    
    it('should use default format if none specified', () => {
      const testDate = new Date(2023, 0, 15);
      expect(date.formatDate(testDate)).toBe('2023-01-15');
    });
    
    it('should handle single-digit dates and times correctly', () => {
      const testDate = new Date(2023, 0, 5, 9, 5, 9); // Jan 5, 2023, 09:05:09
      
      expect(date.formatDate(testDate, 'YYYY-MM-DD')).toBe('2023-01-05');
      expect(date.formatDate(testDate, 'M/D/YYYY')).toBe('1/5/2023');
      expect(date.formatDate(testDate, 'HH:mm:ss')).toBe('09:05:09');
      expect(date.formatDate(testDate, 'H:m:s')).toBe('9:5:9');
    });
    
    it('should handle invalid date objects', () => {
      expect(date.formatDate('not a date')).toBe('');
      expect(date.formatDate(null)).toBe('');
      expect(date.formatDate(undefined)).toBe('');
      expect(date.formatDate({})).toBe('');
    });
  });
  
  describe('dateDiff', () => {
    it('should calculate difference between dates in various units', () => {
      const date1 = new Date(2023, 0, 1);
      const date2 = new Date(2023, 0, 11);
      
      expect(date.dateDiff(date1, date2, 'days')).toBe(10);
      
      // Test different units
      const dateA = new Date(2023, 0, 1, 10, 0, 0);
      const dateB = new Date(2023, 0, 1, 12, 30, 45);
      
      expect(date.dateDiff(dateA, dateB, 'hours')).toBe(2);
      expect(date.dateDiff(dateA, dateB, 'minutes')).toBe(150);
      expect(date.dateDiff(dateA, dateB, 'seconds')).toBe(9045);
      
      // Test years and months
      const dateC = new Date(2020, 0, 1);
      const dateD = new Date(2023, 6, 1);
      
      expect(date.dateDiff(dateC, dateD, 'years')).toBe(3);
      expect(date.dateDiff(dateC, dateD, 'months')).toBe(42);
    });
    
    it('should handle date order correctly (always return positive)', () => {
      const earlier = new Date(2023, 0, 1);
      const later = new Date(2023, 0, 11);
      
      // Should return the same result regardless of order
      expect(date.dateDiff(earlier, later, 'days')).toBe(10);
      expect(date.dateDiff(later, earlier, 'days')).toBe(10);
    });
    
    it('should use default unit (days) if not specified', () => {
      const date1 = new Date(2023, 0, 1);
      const date2 = new Date(2023, 0, 11);
      
      expect(date.dateDiff(date1, date2)).toBe(10);
    });
    
    it('should handle invalid inputs', () => {
      const validDate = new Date();
      expect(date.dateDiff(validDate, 'not a date')).toBeNull();
      expect(date.dateDiff('not a date', validDate)).toBeNull();
      expect(date.dateDiff(null, validDate)).toBeNull();
      expect(date.dateDiff(validDate, null)).toBeNull();
    });
    
    it('should handle invalid unit specifications', () => {
      const date1 = new Date(2023, 0, 1);
      const date2 = new Date(2023, 0, 11);
      
      // Should default to days for invalid units
      expect(date.dateDiff(date1, date2, 'invalidUnit')).toBe(10);
    });
  });
  
  describe('generateCalendar', () => {
    it('should generate a calendar for the specified month', () => {
      // Jan 2023 - First day is Sunday (index 0)
      const calendar = date.generateCalendar(2023, 0);
      
      // Should be a 6×7 grid
      expect(calendar.length).toBe(6);
      calendar.forEach(week => {
        expect(week.length).toBe(7);
      });
      
      // First week should start with Sunday (Jan 1)
      expect(calendar[0][0]).toBe(1); // Jan 1 is Sunday
      
      // Second day should be Monday (Jan 2)
      expect(calendar[0][1]).toBe(2);
      
      // Check a few more days
      expect(calendar[1][0]).toBe(8);  // Second Sunday
      expect(calendar[4][6]).toBe(28); // Last Saturday
      
      // Last day should be 31 for January
      let lastDay = null;
      for (let week = 5; week >= 0; week--) {
        for (let day = 6; day >= 0; day--) {
          if (calendar[week][day] !== null) {
            lastDay = calendar[week][day];
            break;
          }
        }
        if (lastDay !== null) break;
      }
      expect(lastDay).toBe(31);
    });
    
    it('should generate calendar for February (non-leap year)', () => {
      // Feb 2023 - Not a leap year, 28 days
      const calendar = date.generateCalendar(2023, 1);
      
      // Find the last day
      let lastDay = null;
      for (let week = 5; week >= 0; week--) {
        for (let day = 6; day >= 0; day--) {
          if (calendar[week][day] !== null) {
            lastDay = calendar[week][day];
            break;
          }
        }
        if (lastDay !== null) break;
      }
      expect(lastDay).toBe(28);
    });
    
    it('should generate calendar for February (leap year)', () => {
      // Feb 2024 - Leap year, 29 days
      const calendar = date.generateCalendar(2024, 1);
      
      // Find the last day
      let lastDay = null;
      for (let week = 5; week >= 0; week--) {
        for (let day = 6; day >= 0; day--) {
          if (calendar[week][day] !== null) {
            lastDay = calendar[week][day];
            break;
          }
        }
        if (lastDay !== null) break;
      }
      expect(lastDay).toBe(29);
    });
    
    it('should handle current month if none specified', () => {
      const today = new Date();
      const calendar = date.generateCalendar();
      
      // Can't test exact values since it depends on when the test runs,
      // but we can verify the structure
      expect(calendar.length).toBe(6);
      calendar.forEach(week => {
        expect(week.length).toBe(7);
      });
      
      // Should have at least one non-null value
      const hasValidDay = calendar.some(week => week.some(day => day !== null));
      expect(hasValidDay).toBe(true);
    });
    
    it('should handle month values outside the valid range', () => {
      // Month < 0 should default to January (0)
      const negativeMonth = date.generateCalendar(2023, -1);
      expect(negativeMonth[0][0]).toBe(1); // Jan 1, 2023 was a Sunday
      
      // Month > 11