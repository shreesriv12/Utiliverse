import * as stringUtils from './string/index.js';
import * as mathUtils from './math/index.js';
import * as validationUtils from './validation/index.js';
import * as colorUtils from './color/index.js';
import * as dateUtils from './date/index.js';

export default {
  string: stringUtils,
  math: mathUtils,
  validation: validationUtils,
  color: colorUtils,
  date: dateUtils
};

export {
  stringUtils as string,
  mathUtils as math,
  validationUtils as validation,
  colorUtils as color,
  dateUtils as date
};