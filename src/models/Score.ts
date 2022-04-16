export enum ScoreType {
    points,
    advantages,
    penalties
};

export interface Score {
    points: number;
    advantages: number;
    penalties: number;
};

export const defaultScore = (): Score => {
    return {
        points: 0,
        advantages: 0,
        penalties: 0
    };
};