/**
 * Math utility functions
 */

/**
 * Calculates the greatest common divisor (GCD) of two numbers
 */
export const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
};

/**
 * Calculates the least common multiple (LCM) of two numbers
 */
export const lcm = (a, b) => (a * b) / gcd(a, b);

/**
 * Generates a random number within a specified range
 */
export const random = (min, max, isInteger = true) => {
  const value = Math.random() * (max - min) + min;
  return isInteger ? Math.floor(value) : value;
};

/**
 * Calculates the factorial of a number
 */
export const factorial = (num) => {
  if (num < 0) throw new Error('Factorial not defined for negative numbers');
  return num <= 1 ? 1 : num * factorial(num - 1);
};

/**
 * Checks if a number is prime
 */
export const isPrime = (num) => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6)
    if (num % i === 0 || num % (i + 2) === 0) return false;
  return true;
};

/**
 * Returns an array of prime numbers up to a limit
 */
export const getPrimesUpTo = (limit) => {
  const sieve = Array(limit + 1).fill(true);
  sieve[0] = sieve[1] = false;
  for (let i = 2; i * i <= limit; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= limit; j += i) {
        sieve[j] = false;
      }
    }
  }
  return sieve.map((v, i) => (v ? i : null)).filter(Boolean);
};

/**
 * Clamps a number within a range
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Rounds a number to a specified number of decimal places
 */
export const roundTo = (num, decimals = 2) =>
  Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);

/**
 * Calculates the average (mean) of an array of numbers
 */
export const average = (arr) => arr.reduce((sum, val) => sum + val, 0) / arr.length;

/**
 * Calculates the median of an array
 */
export const median = (arr) => {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};

/**
 * Calculates the mode(s) of an array
 */
export const mode = (arr) => {
  const count = {};
  arr.forEach((n) => count[n] = (count[n] || 0) + 1);
  const maxFreq = Math.max(...Object.values(count));
  return Object.keys(count)
    .filter((key) => count[key] === maxFreq)
    .map(Number);
};

/**
 * Calculates the sum of an array
 */
export const sum = (arr) => arr.reduce((acc, val) => acc + val, 0);

/**
 * Generates a numeric range [start, end) with step
 */
export const range = (start, end, step = 1) => {
  const result = [];
  for (let i = start; i < end; i += step) result.push(i);
  return result;
};

/**
 * Maps a value from one range to another
 */
export const mapRange = (value, inMin, inMax, outMin, outMax) =>
  ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

/**
 * Calculates Euclidean distance between two 2D points
 */
export const distance2D = (x1, y1, x2, y2) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
