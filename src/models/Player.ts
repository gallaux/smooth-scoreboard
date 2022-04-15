export type PlayerId = 1 | 2;

export const defaultPlayerName = (id: PlayerId): string => `PLAYER ${id.toString()}`;
export const defaultPlayerCountry = (id: PlayerId): string => id === 1 ? "BR" : "US";