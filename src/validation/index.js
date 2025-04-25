/**
 * Validation utility functions
 */

/**
 * Validates an email address
 */
export const isValidEmail = (email) => {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Validates a phone number by country
 */
export const isValidPhone = (phone, country = 'US') => {
  if (typeof phone !== 'string') return false;
  const patterns = {
    US: /^(\+?1)?[-\s.]?\(?(\d{3})\)?[-\s.]?(\d{3})[-\s.]?(\d{4})$/,
    UK: /^(\+?44|0)[-\s.]?(\d{2,4})[-\s.]?(\d{3,4})[-\s.]?(\d{3,4})$/,
    IN: /^(\+91)?[6-9]\d{9}$/,
  };
  const pattern = patterns[country] || patterns.US;
  return pattern.test(phone);
};

/**
 * Validates a credit card number using Luhn algorithm
 */
export const isValidCreditCard = (cardNumber) => {
  if (typeof cardNumber !== 'string') return false;
  const digitsOnly = cardNumber.replace(/[\s-]/g, '');
  if (!/^\d+$/.test(digitsOnly)) return false;

  let sum = 0;
  let double = false;
  for (let i = digitsOnly.length - 1; i >= 0; i--) {
    let digit = parseInt(digitsOnly[i], 10);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
};

/**
 * Validates a URL
 */
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates a username (alphanumeric, underscores, 3-20 chars)
 */
export const isValidUsername = (username) => {
  return typeof username === 'string' && /^[a-zA-Z0-9_]{3,20}$/.test(username);
};

/**
 * Validates a password with rules (minLength, hasNumber, hasUppercase, etc.)
 */
export const isValidPassword = (
  password,
  { minLength = 8, hasUppercase = true, hasNumber = true, hasSpecial = true } = {}
) => {
  if (typeof password !== 'string' || password.length < minLength) return false;
  if (hasUppercase && !/[A-Z]/.test(password)) return false;
  if (hasNumber && !/\d/.test(password)) return false;
  if (hasSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  return true;
};

/**
 * Checks if a value is numeric
 */
export const isNumeric = (val) => !isNaN(parseFloat(val)) && isFinite(val);

/**
 * Checks if a string contains only letters
 */
export const isAlpha = (str) => /^[a-zA-Z]+$/.test(str);

/**
 * Checks if a string is alphanumeric
 */
export const isAlphanumeric = (str) => /^[a-zA-Z0-9]+$/.test(str);

/**
 * Checks if password is strong (min 8 chars, upper, lower, num, special)
 */
export const isStrongPassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(password);
};

/**
 * Validates a ZIP/Postal code (US-style 5 digits or 5-4)
 */
export const isValidZipCode = (zip) => /^\d{5}(-\d{4})?$/.test(zip);

/**
 * Validates an IPv4 address
 */
export const isValidIPv4 = (ip) =>
  /^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.|$)){4}$/.test(ip);

/**
 * Validates a hex color code
 */
export const isValidHexColor = (color) =>
  /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(color);

/**
 * Validates a date string in YYYY-MM-DD format
 */
export const isValidDate = (dateStr) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(dateStr);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};
