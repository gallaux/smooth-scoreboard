export const defaultPlayerName = (id: PlayerId): string => `PLAYER ${(id + 1).toString()}`;
export const defaultPlayerCountry = (id: PlayerId): string => id === 0 ? "BR" : "US";

export type PlayerId = 0 | 1;

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