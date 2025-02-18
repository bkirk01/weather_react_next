import { describe, it, expect } from 'vitest';

import { utilFormatDate } from '@/utils/dateFormatter';

describe('dateFormatter', () => {
  it('formats date string correctly', () => {
    const testDate = '2025-01-15T12:00:00';
    const result = utilFormatDate(testDate);
    expect(result).toBe('WED 15');
  });

  it('handles different days of the week', () => {
    const dates = [
      { input: '2025-01-13T12:00:00', expected: 'MON 13' },
      { input: '2025-01-14T12:00:00', expected: 'TUE 14' },
      { input: '2025-01-15T12:00:00', expected: 'WED 15' },
      { input: '2025-01-16T12:00:00', expected: 'THU 16' },
      { input: '2025-01-17T12:00:00', expected: 'FRI 17' },
      { input: '2025-01-18T12:00:00', expected: 'SAT 18' },
      { input: '2025-01-19T12:00:00', expected: 'SUN 19' },
    ];

    dates.forEach(({ input, expected }) => {
      expect(utilFormatDate(input)).toBe(expected);
    });
  });

  it('handles single-digit dates', () => {
    const testDate = '2025-01-05T12:00:00';
    const result = utilFormatDate(testDate);
    expect(result).toBe('SUN 5');
  });

  it('handles different months', () => {
    const testDate = '2025-12-25T12:00:00';
    const result = utilFormatDate(testDate);
    expect(result).toBe('THU 25');
  });

  it('handles invalid date strings gracefully', () => {
    expect(() => utilFormatDate('invalid-date')).not.toThrow();
    expect(utilFormatDate('invalid-date')).toBe('Invalid Date');
  });
});
