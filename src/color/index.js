/**
 * Converts hex color to RGB
 * @param {string} hex - Hex color code
 * @returns {Object|null} RGB color object or null if invalid
 */
export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };
  
  /**
   * Converts RGB to hex color
   * @param {number} r - Red component (0-255)
   * @param {number} g - Green component (0-255)
   * @param {number} b - Blue component (0-255)
   * @returns {string} Hex color code
   */
  export const rgbToHex = (r, g, b) => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };
  
  /**
   * Converts RGB to HSL
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {Object} HSL color object
   */
  export const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };
  
  /**
   * Converts HSL to hex color
   * @param {number} h
   * @param {number} s
   * @param {number} l
   * @returns {string} Hex color code
   */
  export const hslToHex = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
  
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
  
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
  
    return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
  };
  
  /**
   * Generates a color palette based on a base color
   * @param {string} baseColor
   * @param {number} [count=5]
   * @returns {Array<string>} Array of hex colors
   */
  export const generatePalette = (baseColor, count = 5) => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return [];
  
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const palette = [];
  
    for (let i = 0; i < count; i++) {
      const newL = Math.max(0, Math.min(100, hsl.l - 30 + (i * 15)));
      palette.push(hslToHex(hsl.h, hsl.s, newL));
    }
  
    return palette;
  };
  
  /**
   * Calculates the contrast ratio between two colors
   * @param {string} color1
   * @param {string} color2
   * @returns {number|null} Contrast ratio (1–21)
   */
  export const calculateContrast = (color1, color2) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    if (!rgb1 || !rgb2) return null;
  
    const getLuminance = (r, g, b) => {
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928
          ? v / 12.92
          : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };
  
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
  
    return (brightest + 0.05) / (darkest + 0.05);
  };
  
  /**
   * Validates if a string is a valid hex color
   * @param {string} hex
   * @returns {boolean}
   */
  export const isValidHex = (hex) =>
    /^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(hex);
  
  /**
   * Inverts a hex color
   * @param {string} hex
   * @returns {string|null} Inverted hex color
   */
  export const invertColor = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    return rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b);
  };
  
  /**
   * Returns the complementary color of a given hex color
   * @param {string} hex
   * @returns {string|null}
   */
  export const getComplementaryColor = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const complementaryHue = (hsl.h + 180) % 360;
    return hslToHex(complementaryHue, hsl.s, hsl.l);
  };
  
  /**
   * Lightens or darkens a color
   * @param {string} hex
   * @param {number} percent
   * @returns {string|null}
   */
  export const adjustBrightness = (hex, percent) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
  
    const adjust = (val) => Math.min(255, Math.max(0, val + (val * percent / 100)));
    return rgbToHex(
      Math.round(adjust(rgb.r)),
      Math.round(adjust(rgb.g)),
      Math.round(adjust(rgb.b))
    );
  };
  
  /**
   * Checks if two colors meet WCAG contrast requirements
   * @param {string} color1
   * @param {string} color2
   * @param {'AA'|'AAA'} level
   * @param {'normal'|'large'} textSize
   * @returns {boolean}
   */
  export const isColorReadable = (color1, color2, level = 'AA', textSize = 'normal') => {
    const ratio = calculateContrast(color1, color2);
    if (!ratio) return false;
  
    if (level === 'AA') {
      return textSize === 'large' ? ratio >= 3 : ratio >= 4.5;
    } else if (level === 'AAA') {
      return textSize === 'large' ? ratio >= 4.5 : ratio >= 7;
    }
    return false;
  };
  