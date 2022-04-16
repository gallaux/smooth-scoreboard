import { useEffect, useState } from 'react';

const maximumDuration = 99 * 60 + 59;
const minimumDuration = 0;

const useCountdownTimer = (duration: number) => {
    const [countdown, setCountdown] = useState<number>(duration);
    const [isCounting, setIsCounting] = useState<boolean>(false);

    const addTime = (seconds: number) => {
        setTime(countdown + seconds);
    };

    const setTime = (seconds: number) => {
        if (seconds > maximumDuration) {
            seconds = maximumDuration;
        } else if (seconds < minimumDuration) {
            seconds = minimumDuration;
        }
        setCountdown(seconds);
    };

    const toggleCountdown = () => {
        setIsCounting(prevIsCounting => !prevIsCounting);
    };

    const resetTimer = () => {
        setCountdown(duration);
    };

    useEffect(() => {
        setTime(duration);
    }, [duration]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isCounting && countdown > 0) {
                setCountdown(prevCountdown => prevCountdown - 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [countdown, isCounting]);

    return { countdown, addTime, isCounting, resetTimer, toggleCountdown };
};

export default useCountdownTimer;