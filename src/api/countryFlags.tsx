const countryFlagsApiUrl: string = 'https://flagcdn.com';

export const getCountryFlagUrl = (countryCode: string): string =>
  countryCode ? `${countryFlagsApiUrl}/w640/${countryCode.toLowerCase()}.png` : '';