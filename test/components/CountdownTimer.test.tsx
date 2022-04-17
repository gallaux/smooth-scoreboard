import 'jest'
import { formatTimer } from '../../src/components/CountdownTimer';

describe("formatTimer", () => {
    it("Returns a string from a number representing seconds into a MIN ", () => {
        const time1: number = 300; // 5 minutes
        const time2: number = 123; // 2 minutes, 3 seconds;
        const time3: number = 3690; // 1 hours, 1 minute, 30 seconds;

        expect(formatTimer(time1)).toEqual("05:00");
        expect(formatTimer(time2)).toEqual("02:03");
        expect(formatTimer(time3)).toEqual("60:01");
    });
});