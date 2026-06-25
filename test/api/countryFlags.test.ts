import 'jest';
import { getCountryFlagUrl } from '../../src/api/countryFlags';

describe('getCountryFlagUrl', () => {
  it('returns a PNG URL for a valid country code', () => {
    expect(getCountryFlagUrl('US')).toBe('https://flagcdn.com/w640/us.png');
  });

  it('lowercases the country code', () => {
    expect(getCountryFlagUrl('BR')).toBe('https://flagcdn.com/w640/br.png');
    expect(getCountryFlagUrl('Fr')).toBe('https://flagcdn.com/w640/fr.png');
  });

  it('returns an empty string for an empty country code', () => {
    expect(getCountryFlagUrl('')).toBe('');
  });

  it('handles various country codes', () => {
    expect(getCountryFlagUrl('CA')).toBe('https://flagcdn.com/w640/ca.png');
    expect(getCountryFlagUrl('JP')).toBe('https://flagcdn.com/w640/jp.png');
    expect(getCountryFlagUrl('GB')).toBe('https://flagcdn.com/w640/gb.png');
  });
});
