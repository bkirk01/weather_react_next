import { describe, it, expect } from 'vitest';

import { getWeatherIcon } from '@/utils/weatherIcons';

const ROOT_IMAGES_PATH = '/assets/icons';

describe('weatherIcons', () => {
  it('returns correct icon path for sunny conditions', () => {
    expect(getWeatherIcon(1).src).toBe(`${ROOT_IMAGES_PATH}/1-s.png`);
    expect(getWeatherIcon(2).src).toBe(`${ROOT_IMAGES_PATH}/2-s.png`);
  });

  it('returns correct icon path for cloudy conditions', () => {
    const cloudyIcons = [3, 4, 5, 6, 7, 8];
    cloudyIcons.forEach(iconNumber => {
      expect(getWeatherIcon(iconNumber).src).toBe(`${ROOT_IMAGES_PATH}/${iconNumber}-s.png`);
    });
  });

  it('returns correct icon path for rainy conditions', () => {
    const rainyIcons = [12, 13, 14, 18];
    rainyIcons.forEach(iconNumber => {
      expect(getWeatherIcon(iconNumber).src).toBe(`${ROOT_IMAGES_PATH}/${iconNumber}-s.png`);
    });
  });

  it('returns correct icon path for stormy conditions', () => {
    const stormyIcons = [15, 16, 17];
    stormyIcons.forEach(iconNumber => {
      expect(getWeatherIcon(iconNumber).src).toBe(`${ROOT_IMAGES_PATH}/${iconNumber}-s.png`);
    });
  });

  it('returns correct icon path for snowy conditions', () => {
    const snowyIcons = [19, 20, 21, 22, 23, 26];
    snowyIcons.forEach(iconNumber => {
      expect(getWeatherIcon(iconNumber).src).toBe(`${ROOT_IMAGES_PATH}/${iconNumber}-s.png`);
    });
  });

  it('returns correct icon path for special conditions', () => {
    expect(getWeatherIcon(11).src).toBe(`${ROOT_IMAGES_PATH}/11-s.png`);
    expect(getWeatherIcon(24).src).toBe(`${ROOT_IMAGES_PATH}/24-s.png`);
    expect(getWeatherIcon(25).src).toBe(`${ROOT_IMAGES_PATH}/25-s.png`);
    expect(getWeatherIcon(29).src).toBe(`${ROOT_IMAGES_PATH}/29-s.png`);
    expect(getWeatherIcon(30).src).toBe(`${ROOT_IMAGES_PATH}/30-s.png`);
    expect(getWeatherIcon(31).src).toBe(`${ROOT_IMAGES_PATH}/31-s.png`);
    expect(getWeatherIcon(32).src).toBe(`${ROOT_IMAGES_PATH}/32-s.png`);
  });

  it('returns default cloudy icon for unknown icon numbers', () => {
    expect(getWeatherIcon(999).src).toBe(`${ROOT_IMAGES_PATH}/6-s.png`);
    expect(getWeatherIcon(-1).src).toBe(`${ROOT_IMAGES_PATH}/6-s.png`);
    expect(getWeatherIcon(0).src).toBe(`${ROOT_IMAGES_PATH}/6-s.png`);
  });

  it('maintains consistent icon path structure', () => {
    const iconPath = getWeatherIcon(1).src;
    expect(iconPath).toMatch(/^\/assets\/icons\/.*\.png$/);
  });
});
