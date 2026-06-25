import 'jest'
import { formatTimer } from '../../src/components/countdownTimer';

describe("formatTimer", () => {
  it("Returns a string from a number representing seconds into a MIN ", () => {
    const time1: number = 300; // 5 minutes
    const time2: number = 123; // 2 minutes, 3 seconds;
    const time3: number = 3600; // 60 minutes, 0 seconds (max);

    expect(formatTimer(time1)).toEqual("05:00");
    expect(formatTimer(time2)).toEqual("02:03");
    expect(formatTimer(time3)).toEqual("60:00");
  });
});