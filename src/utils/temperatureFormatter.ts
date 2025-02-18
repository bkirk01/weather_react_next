/**
 * Temperature Utility Functions
 *
 * Provides utility functions for temperature conversions and formatting:
 * - Celsius to Fahrenheit conversion
 * - Fahrenheit to Celsius conversion
 * - Temperature formatting with unit awareness
 * - Precise decimal handling
 */

export const convertCelsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

export const convertFahrenheitToCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

export const formatTemperature = (
  temperature: number,
  unit: 'C' | 'F',
  fromUnit: 'C' | 'F' = 'C'
): number => {
  if (unit === fromUnit) {
    return temperature;
  }
  return unit === 'F'
    ? convertCelsiusToFahrenheit(temperature)
    : convertFahrenheitToCelsius(temperature);
};
