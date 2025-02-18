import { describe, it, expect } from 'vitest';

import {
  convertCelsiusToFahrenheit,
  convertFahrenheitToCelsius,
  formatTemperature,
} from '@/utils/temperatureFormatter';

describe('temperatureUtils', () => {
  describe('convertCelsiusToFahrenheit', () => {
    it('converts 0°C to 32°F', () => {
      expect(convertCelsiusToFahrenheit(0)).toBe(32);
    });

    it('converts 100°C to 212°F', () => {
      expect(convertCelsiusToFahrenheit(100)).toBe(212);
    });

    it('converts negative temperatures correctly', () => {
      expect(convertCelsiusToFahrenheit(-40)).toBe(-40);
    });

    it('handles decimal values', () => {
      expect(convertCelsiusToFahrenheit(21.5)).toBe(70.7);
    });
  });

  describe('convertFahrenheitToCelsius', () => {
    it('converts 32°F to 0°C', () => {
      expect(convertFahrenheitToCelsius(32)).toBe(0);
    });

    it('converts 212°F to 100°C', () => {
      expect(convertFahrenheitToCelsius(212)).toBe(100);
    });

    it('converts negative temperatures correctly', () => {
      expect(convertFahrenheitToCelsius(-40)).toBe(-40);
    });

    it('handles decimal values', () => {
      expect(convertFahrenheitToCelsius(70.7)).toBeCloseTo(21.5, 1);
    });
  });

  describe('formatTemperature', () => {
    it('returns same value when source and target units are the same', () => {
      expect(formatTemperature(25, 'C', 'C')).toBe(25);
      expect(formatTemperature(77, 'F', 'F')).toBe(77);
    });

    it('converts from Celsius to Fahrenheit', () => {
      expect(formatTemperature(25, 'F', 'C')).toBe(77);
    });

    it('converts from Fahrenheit to Celsius', () => {
      expect(formatTemperature(77, 'C', 'F')).toBeCloseTo(25, 1);
    });

    it('uses Celsius as default source unit', () => {
      expect(formatTemperature(25, 'F')).toBe(77);
    });

    it('handles negative values', () => {
      expect(formatTemperature(-40, 'F', 'C')).toBe(-40);
      expect(formatTemperature(-40, 'C', 'F')).toBe(-40);
    });

    it('handles decimal values', () => {
      expect(formatTemperature(21.5, 'F', 'C')).toBe(70.7);
      expect(formatTemperature(70.7, 'C', 'F')).toBeCloseTo(21.5, 1);
    });
  });
});
