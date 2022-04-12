import { useEffect, useState } from 'react';

const maximumDuration = 99 * 60 + 59;
const minimumDuration = 0;

const useCountdownTimer = (duration: number) => {
    const [countdown, setCountdown] = useState(duration);
    const [isCounting, setIsCounting] = useState(false);

    const addTime = (seconds: number) => {
        let time: number = countdown + seconds;
        if (time > maximumDuration) {
            time = maximumDuration;
        } else if (time < minimumDuration) {
            time = minimumDuration;
        }

        setCountdown(time);
    };

    const toggleCountdown = () => {
        setIsCounting(prevIsCounting => !prevIsCounting);
    };

    const resetTimer = () => {
        setCountdown(duration);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (isCounting && countdown > 0) {
                setCountdown(prevCountdown => prevCountdown - 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [countdown, duration, isCounting]);

    return { countdown, addTime, isCounting, resetTimer, toggleCountdown };
};

export default useCountdownTimer;