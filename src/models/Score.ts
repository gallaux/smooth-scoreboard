export interface Score {
    point: number;
    advantage: number;
    penalty: number;
};

export const defaultScore = (): Score => {
    return {
        point: 0,
        advantage: 0,
        penalty: 0
    };
};