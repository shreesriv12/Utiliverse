/**
 * String utility functions
 */

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str) =>
  typeof str === 'string' && str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

/**
 * Converts a string to camelCase
 */
export const toCamelCase = (str) =>
  typeof str === 'string' && str
    ? str
        .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
        .replace(/^([A-Z])/, (m) => m.toLowerCase())
    : '';

/**
 * Converts a string to snake_case
 */
export const toSnakeCase = (str) =>
  typeof str === 'string' && str
    ? str
        .replace(/\s+/g, '_')
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .toLowerCase()
    : '';

/**
 * Converts a string to kebab-case
 */
export const toKebabCase = (str) =>
  typeof str === 'string' && str
    ? str
        .replace(/\s+/g, '-')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase()
    : '';

/**
 * Converts a string to PascalCase
 */
export const toPascalCase = (str) =>
  typeof str === 'string' && str
    ? str
        .replace(/(^\w|[-_\s]\w)/g, (m) => m.replace(/[-_\s]/, '').toUpperCase())
    : '';

/**
 * Converts a string to Title Case
 */
export const toTitleCase = (str) =>
  typeof str === 'string' && str
    ? str
        .toLowerCase()
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : '';

/**
 * Trims whitespace from a string
 */
export const trim = (str, all = false) =>
  typeof str === 'string' ? (all ? str.replace(/\s+/g, '') : str.trim()) : '';

/**
 * Reverses a string
 */
export const reverse = (str) =>
  typeof str === 'string' ? [...str].reverse().join('') : '';

/**
 * Truncates a string to a specified length and adds ellipsis
 */
export const truncate = (str, length = 50) =>
  typeof str === 'string' && str.length > length ? str.slice(0, length) + '...' : str;

/**
 * Repeats a string n times
 */
export const repeat = (str, times = 1) =>
  typeof str === 'string' ? str.repeat(times) : '';

/**
 * Checks if a string is a palindrome
 */
export const isPalindrome = (str) =>
  typeof str === 'string'
    ? str.toLowerCase().replace(/[^a-z0-9]/g, '') ===
      str.toLowerCase().replace(/[^a-z0-9]/g, '').split('').reverse().join('')
    : false;

/**
 * Counts how many times a substring appears in a string
 */
export const countOccurrences = (str, substr) =>
  typeof str === 'string' && typeof substr === 'string'
    ? str.split(substr).length - 1
    : 0;

/**
 * Escapes HTML special characters
 */
export const escapeHTML = (str) =>
  typeof str === 'string'
    ? str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
    : '';

/**
 * Unescapes HTML special characters
 */
export const unescapeHTML = (str) =>
  typeof str === 'string'
    ? str
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
    : '';

/**
 * Removes all punctuation from a string
 */
export const stripPunctuation = (str) =>
  typeof str === 'string' ? str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') : '';

/**
 * Checks if a string is empty or contains only whitespace
 */
export const isEmpty = (str) =>
  typeof str === 'string' ? str.trim().length === 0 : true;

export const hasOnlyWhitespace = (str) =>
  typeof str === 'string' ? /^\s*$/.test(str) : false;
