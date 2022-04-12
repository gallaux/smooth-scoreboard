import { toStringWithZeroPadding } from 'tunis-extensions';

export const formatTimer = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${toStringWithZeroPadding(minutes, 2)}:${toStringWithZeroPadding(seconds, 2)}`;
};