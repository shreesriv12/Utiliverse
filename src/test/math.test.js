// test/math.test.js
import { math } from '../src/index.js';

describe('Math Utilities', () => {
  describe('gcd', () => {
    it('should find the greatest common divisor', () => {
      expect(math.gcd(12, 8)).toBe(4);
      expect(math.gcd(17, 13)).toBe(1);
      expect(math.gcd(0, 5)).toBe(5);
      expect(math.gcd(5, 0)).toBe(5);
      expect(math.gcd(48, 18)).toBe(6);
      expect(math.gcd(144, 12)).toBe(12);
    });
    
    it('should handle negative numbers', () => {
      expect(math.gcd(-12, 8)).toBe(4);
      expect(math.gcd(12, -8)).toBe(4);
      expect(math.gcd(-12, -8)).toBe(4);
    });

    it('should return 0 for edge cases', () => {
      expect(math.gcd(0, 0)).toBe(0);
    });
  });
  
  describe('random', () => {
    it('should generate integers within range', () => {
      // Test 100 random numbers to ensure they're in range
      for (let i = 0; i < 100; i++) {
        const result = math.random(5, 10);
        expect(result).toBeGreaterThanOrEqual(5);
        expect(result).toBeLessThanOrEqual(10);
        expect(Number.isInteger(result)).toBe(true);
      }
    });
    
    it('should generate floating point numbers when specified', () => {
      const result = math.random(1, 2, false);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(2);
      
      // Test 100 random floats to ensure they're in range
      for (let i = 0; i < 100; i++) {
        const result = math.random(5, 10, false);
        expect(result).toBeGreaterThanOrEqual(5);
        expect(result).toBeLessThanOrEqual(10);
      }
    });

    it('should handle min greater than max', () => {
      const result = math.random(10, 5);
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThanOrEqual(10);
    });
  });
  
  describe('factorial', () => {
    it('should calculate factorial correctly', () => {
      expect(math.factorial(0)).toBe(1);
      expect(math.factorial(1)).toBe(1);
      expect(math.factorial(2)).toBe(2);
      expect(math.factorial(3)).toBe(6);
      expect(math.factorial(4)).toBe(24);
      expect(math.factorial(5)).toBe(120);
      expect(math.factorial(10)).toBe(3628800);
    });
    
    it('should throw error for negative numbers', () => {
      expect(() => math.factorial(-1)).toThrow();
      expect(() => math.factorial(-5)).toThrow();
    });
    
    it('should handle non-integer inputs', () => {
      expect(() => math.factorial(3.5)).not.toThrow();
      // Should treat floating points as integers
      expect(math.factorial(5.7)).toBe(120);
    });
  });
});