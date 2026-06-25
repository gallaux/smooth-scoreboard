import 'jest';
import { formatTimer } from '../../src/components/countdownTimer';

describe('formatTimer edge cases', () => {
  it('formats 0 seconds as 00:00', () => {
    expect(formatTimer(0)).toEqual('00:00');
  });

  it('formats single-digit seconds with zero padding', () => {
    expect(formatTimer(5)).toEqual('00:05');
    expect(formatTimer(9)).toEqual('00:09');
  });

  it('formats 59 seconds correctly', () => {
    expect(formatTimer(59)).toEqual('00:59');
  });

  it('formats exactly 1 minute', () => {
    expect(formatTimer(60)).toEqual('01:00');
  });

  it('formats 1 minute and 1 second', () => {
    expect(formatTimer(61)).toEqual('01:01');
  });

  it('formats 10 minutes exactly', () => {
    expect(formatTimer(600)).toEqual('10:00');
  });

  it('formats maximum timer value (60 minutes)', () => {
    expect(formatTimer(3600)).toEqual('60:00');
  });

  it('formats 59 minutes and 59 seconds', () => {
    expect(formatTimer(3599)).toEqual('59:59');
  });

  it('formats mixed minutes and seconds', () => {
    expect(formatTimer(754)).toEqual('12:34');
    expect(formatTimer(90)).toEqual('01:30');
    expect(formatTimer(150)).toEqual('02:30');
  });
});
