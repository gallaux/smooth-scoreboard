import { createContext, useContext, useState } from "react";
import useCountdownTimer from "../hooks/useCountdownTimer";
import { ControlPanelMenu } from "../models/ControlPanelMenu";
import { TimerStatus } from "../models/TimerStatus";

const defaultMatchDuration: number = 3;//5 * 60;

export type ScoreboardContextType = {
    timerStatus?: TimerStatus;
    setTimerStatus?: (status: TimerStatus) => void;
    controlPanelMenu: ControlPanelMenu;
    toggleControlPanelMenu: (menu: ControlPanelMenu) => void;
    resetMatch: () => void;
    // Countdown timer hook
    countdown: number;
    addTime: (seconds: number) => void;
    isCounting: boolean;
    resetTimer: () => void;
    toggleCountdown: () => void;
};

export const ScoreboardContext = createContext<ScoreboardContextType>({
    controlPanelMenu: ControlPanelMenu.Hidden,
    toggleControlPanelMenu: () => { },
    resetMatch: () => { },
    // Countdown timer hook
    countdown: 0,
    addTime: () => { },
    isCounting: false,
    resetTimer: () => { },
    toggleCountdown: () => { }
});
export const useScoreboardContext = () => useContext(ScoreboardContext);

const ScoreboardProvider = ({ ...props }) => {
    const [timerStatus, setTimerStatus] = useState(TimerStatus.Reset);
    const [controlPanelMenu, setControlPanelMenu] = useState(ControlPanelMenu.Hidden);
    const { countdown, addTime, isCounting, resetTimer, toggleCountdown } = useCountdownTimer(defaultMatchDuration);

    const resetMatch = () => {
        resetTimer();
        //resetScore();
    };

    const toggleControlPanelMenu = (menu: ControlPanelMenu) => {
        setControlPanelMenu(controlPanelMenu === menu ? ControlPanelMenu.Hidden : menu);
    };

    return (
        <ScoreboardContext.Provider value={{
            setTimerStatus, timerStatus,
            toggleControlPanelMenu, controlPanelMenu,
            resetMatch,
            countdown, addTime, isCounting, resetTimer, toggleCountdown
        }} >
            {props.children}
        </ScoreboardContext.Provider>
    );
}

export default ScoreboardProvider;