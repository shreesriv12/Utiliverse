# Utiliverse

A collection of utility functions for strings, math, validation, colors, and dates.

## Installation
bash
npm install [package-name]


*Usage*

const utils = require('utiliverse');

// String utilities
console.log(utils.capitalize('hello world')); // Hello world

// Math utilities
console.log(utils.gcd(12, 15)); // 3

// Validation
console.log(utils.isValidEmail('example@example.com')); // true

// Color utilities
console.log(utils.hexToRgb('#ffffff')); // { r: 255, g: 255, b: 255 }

// Date utilities
console.log(utils.formatDate(new Date())); // YYYY-MM-DD


*API*
*String Utilities*
- `capitalize(str)`: Capitalizes the first letter of a string.
- `trim(str)`: Trims whitespace from a string.

*Math Utilities*
- `gcd(a, b)`: Calculates the greatest common divisor of two numbers.
- `random(min, max)`: Generates a random number between min and max.

*Validation*
- `isValidEmail(email)`: Validates an email address.
- `isValidPhoneNumber(phoneNumber)`: Validates a phone number.

*Color Utilities*
- `hexToRgb(hex)`: Converts a hex color to RGB.
- `rgbToHex(rgb)`: Converts an RGB color to hex.

*Date Utilities*
- `formatDate(date)`: Formats a date in YYYY-MM-DD format.
- `getDateDifference(date1, date2)`: Calculates the difference between two dates.


*License*
Licensed under the MIT License.
