# UTILIVERSE

A comprehensive JavaScript utility library providing a collection of helper functions for string manipulation, math operations, validation, color handling, and date formatting.

## Installation

```bash
npm install js-utils-toolkit
```

## Usage

```javascript
// Import the entire library
import jsUtils from 'js-utils-toolkit';

// Use string utilities
jsUtils.string.capitalize('hello'); // 'Hello'

// Or import specific modules
import { string, math } from 'js-utils-toolkit';

string.toCamelCase('hello-world'); // 'helloWorld'
math.factorial(5); // 120
```

## Features

### String Utilities

```javascript
import { string } from 'js-utils-toolkit';

// Capitalize the first letter
string.capitalize('hello'); // 'Hello'

// Convert to camelCase
string.toCamelCase('hello-world'); // 'helloWorld'

// Convert to snake_case
string.toSnakeCase('helloWorld'); // 'hello_world'

// Trim whitespace
string.trim('  hello  '); // 'hello'
string.trim('hello world', true); // 'helloworld' (removes all whitespace)
```

### Math Utilities

```javascript
import { math } from 'js-utils-toolkit';

// Calculate GCD
math.gcd(12, 8); // 4

// Generate random number
math.random(1, 10); // Random integer between 1 and 10
math.random(1, 10, false); // Random floating-point number between 1 and 10

// Calculate factorial
math.factorial(5); // 120
```

### Validation Utilities

```javascript
import { validation } from 'js-utils-toolkit';

// Validate email
validation.isValidEmail('user@example.com'); // true

// Validate phone number
validation.isValidPhone('123-456-7890'); // true
validation.isValidPhone('07911 123456', 'UK'); // true

// Validate credit card
validation.isValidCreditCard('4111111111111111'); // true
```

### Color Utilities

```javascript
import { color } from 'js-utils-toolkit';

// Convert hex to RGB
color.hexToRgb('#ff0000'); // { r: 255, g: 0, b: 0 }

// Convert RGB to hex
color.rgbToHex(255, 0, 0); // '#ff0000'

// Generate a color palette
color.generatePalette('#3498db', 5); // Array of 5 color variations

// Calculate contrast ratio
color.calculateContrast('#ffffff', '#000000'); // 21 (maximum contrast)
```

### Date Utilities

```javascript
import { date } from 'js-utils-toolkit';

// Format date
date.formatDate(new Date(2023, 0, 1), 'YYYY-MM-DD'); // '2023-01-01'

// Calculate date difference
const date1 = new Date(2023, 0, 1);
const date2 = new Date(2023, 0, 10);
date.dateDiff(date1, date2, 'days'); // 9

// Generate calendar
date.generateCalendar(2023, 0); // Calendar for January 2023
```

## License

MIT