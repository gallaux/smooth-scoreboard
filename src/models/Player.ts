export const defaultMatchDuration: number = 5 * 60;
export const defaultPlayerName = (id: PlayerId): string => `PLAYER ${(id).toString()}`;
export const defaultPlayerCountry = (id: PlayerId): string => id === 1 ? "BR" : "US";

export type PlayerId = 1 | 2;

export interface Player {
    id: PlayerId;
    name: string;
    countryCode: string;
};

export const defaultPlayer = (id: PlayerId): Player => {
    return {
        id: id,
        name: defaultPlayerName(id),
        countryCode: defaultPlayerCountry(id)
    };
};