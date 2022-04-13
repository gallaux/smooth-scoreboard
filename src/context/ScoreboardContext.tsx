import { createContext, useContext, useState } from "react";
import useCountdownTimer from "../hooks/useCountdownTimer";
import { TimerStatus } from "../models/TimerStatus";

const defaultMatchDuration: number = 3; //5 * 60;

export type ScoreboardContextType = {
    timerStatus?: TimerStatus;
    setTimerStatus?: (status: TimerStatus) => void;



    resetMatch: () => void;



    // Countdown timer hook
    countdown: number;
    addTime: (seconds: number) => void;
    isCounting: boolean;
    resetTimer: () => void;
    setTime: (seconds: number) => void;
    toggleCountdown: () => void;
};

export const ScoreboardContext = createContext<ScoreboardContextType>({


    resetMatch: () => { },



    // Countdown timer hook
    countdown: 0,
    addTime: () => { },
    isCounting: false,
    resetTimer: () => { },
    setTime: () => { },
    toggleCountdown: () => { }
});
export const useScoreboardContext = () => useContext(ScoreboardContext);

const ScoreboardProvider = ({ ...props }) => {
    const [timerStatus, setTimerStatus] = useState(TimerStatus.Reset);

    const { countdown, addTime, isCounting, resetTimer, setTime, toggleCountdown } = useCountdownTimer(defaultMatchDuration);

    const resetMatch = () => {
        resetTimer();
        //resetScore();
    };

    return (
        <ScoreboardContext.Provider value={{
            setTimerStatus, timerStatus,

            resetMatch,
            countdown, addTime, isCounting, resetTimer, setTime, toggleCountdown
        }} >
            {props.children}
        </ScoreboardContext.Provider>
    );
}

export default ScoreboardProvider;