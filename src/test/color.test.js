// test/color.test.js
import { color } from '../src/index.js';

describe('Color Utilities', () => {
  describe('hexToRgb', () => {
    it('should convert hex colors to RGB', () => {
      expect(color.hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(color.hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0 });
      expect(color.hexToRgb('#0000ff')).toEqual({ r: 0, g: 0, b: 255 });
      expect(color.hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(color.hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    });
    
    it('should handle hex colors without the # prefix', () => {
      expect(color.hexToRgb('ff0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(color.hexToRgb('00ff00')).toEqual({ r: 0, g: 255, b: 0 });
    });
    
    it('should handle invalid hex values', () => {
      expect(color.hexToRgb('not-a-color')).toBeNull();
      expect(color.hexToRgb('#xyz')).toBeNull();
      expect(color.hexToRgb('#ff00')).toBeNull();
      expect(color.hexToRgb('')).toBeNull();
      expect(color.hexToRgb(null)).toBeNull();
      expect(color.hexToRgb(undefined)).toBeNull();
    });
  });
  
  describe('rgbToHex', () => {
    it('should convert RGB to hex colors', () => {
      expect(color.rgbToHex(255, 0, 0)).toBe('#ff0000');
      expect(color.rgbToHex(0, 255, 0)).toBe('#00ff00');
      expect(color.rgbToHex(0, 0, 255)).toBe('#0000ff');
      expect(color.rgbToHex(255, 255, 255)).toBe('#ffffff');
      expect(color.rgbToHex(0, 0, 0)).toBe('#000000');
    });
    
    it('should handle component values outside the valid range', () => {
      expect(color.rgbToHex(300, 0, 0)).toBe('#ff0000');  // Clamp to 255
      expect(color.rgbToHex(-10, 255, 0)).toBe('#00ff00'); // Negative becomes 0
    });
    
    it('should handle non-integer inputs', () => {
      expect(color.rgbToHex(255.7, 0, 0)).toBe('#ff0000');
      expect(color.rgbToHex(255.2, 128.7, 64.1)).toBe('#ff8040');
    });
  });
  
  describe('rgbToHsl', () => {
    it('should convert RGB to HSL', () => {
      // Red (hue 0, full saturation, 50% lightness)
      const redHsl = color.rgbToHsl(255, 0, 0);
      expect(redHsl.h).toBe(0);
      expect(redHsl.s).toBe(100);
      expect(redHsl.l).toBe(50);
      
      // Green (hue 120, full saturation, 50% lightness)
      const greenHsl = color.rgbToHsl(0, 255, 0);
      expect(greenHsl.h).toBe(120);
      expect(greenHsl.s).toBe(100);
      expect(greenHsl.l).toBe(50);
      
      // White (no hue, no saturation, full lightness)
      const whiteHsl = color.rgbToHsl(255, 255, 255);
      expect(whiteHsl.s).toBe(0);
      expect(whiteHsl.l).toBe(100);
      
      // Black (no hue, no saturation, no lightness)
      const blackHsl = color.rgbToHsl(0, 0, 0);
      expect(blackHsl.s).toBe(0);
      expect(blackHsl.l).toBe(0);
    });
  });
  
  describe('hslToHex', () => {
    it('should convert HSL to hex colors', () => {
      // Red
      expect(color.hslToHex(0, 100, 50)).toBe('#ff0000');
      
      // Green
      expect(color.hslToHex(120, 100, 50)).toBe('#00ff00');
      
      // Blue
      expect(color.hslToHex(240, 100, 50)).toBe('#0000ff');
      
      // White and black
      expect(color.hslToHex(0, 0, 100)).toBe('#ffffff');
      expect(color.hslToHex(0, 0, 0)).toBe('#000000');
    });
    
    it('should handle values outside the normal ranges', () => {
      // Hue wraps around after 360
      expect(color.hslToHex(360, 100, 50)).toBe('#ff0000'); // Same as hue 0
      expect(color.hslToHex(480, 100, 50)).toBe('#00ff00'); // Same as hue 120
      
      // Saturation and lightness clamp to 0-100
      expect(color.hslToHex(0, 150, 50)).toBe('#ff0000');
      expect(color.hslToHex(0, 100, 150)).toBe('#ffffff');
    });
  });
  
  describe('generatePalette', () => {
    it('should generate a color palette with the specified number of colors', () => {
      const palette = color.generatePalette('#3498db', 5);
      expect(palette).toBeInstanceOf(Array);
      expect(palette.length).toBe(5);
      
      // Each item should be a valid hex color
      palette.forEach(hex => {
        expect(hex).toMatch(/^#[0-9a-f]{6}$/i);
      });
      
      // Test with different count
      const smallPalette = color.generatePalette('#3498db', 3);
      expect(smallPalette.length).toBe(3);
    });
    
    it('should handle invalid base colors', () => {
      expect(color.generatePalette('not-a-color')).toEqual([]);
      expect(color.generatePalette('')).toEqual([]);
      expect(color.generatePalette(null)).toEqual([]);
    });
    
    it('should use default count if not specified', () => {
      const palette = color.generatePalette('#3498db');
      expect(palette.length).toBe(5); // Default is 5
    });
  });
  
  describe('calculateContrast', () => {
    it('should calculate contrast ratio between colors', () => {
      // White and black have maximum contrast (21:1)
      const contrast = color.calculateContrast('#ffffff', '#000000');
      expect(contrast).toBeCloseTo(21, 0);
      
      // Same colors have minimum contrast (1:1)
      expect(color.calculateContrast('#ff0000', '#ff0000')).toBeCloseTo(1, 0);
      
      // Check some common combinations
      // White on blue should have good contrast
      expect(color.calculateContrast('#ffffff', '#0000ff')).toBeGreaterThan(8);
      
      // Yellow on white has poor contrast
      expect(color.calculateContrast('#ffff00', '#ffffff')).toBeLessThan(1.5);
    });
    
    it('should handle invalid colors', () => {
      expect(color.calculateContrast('not-a-color', '#ffffff')).toBeNull();
      expect(color.calculateContrast('#ffffff', null)).toBeNull();
      expect(color.calculateContrast(null, null)).toBeNull();
    });
    
    it('should be commutative (order doesn\'t matter)', () => {
      const color1 = '#123456';
      const color2 = '#abcdef';
      
      const contrast1 = color.calculateContrast(color1, color2);
      const contrast2 = color.calculateContrast(color2, color1);
      
      expect(contrast1).toBeCloseTo(contrast2, 5);
    });
  });
});