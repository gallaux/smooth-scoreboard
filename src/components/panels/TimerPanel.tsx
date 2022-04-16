import { useContext, useEffect } from "react";
import { ScoreboardContext, ScoreboardContextType } from "../../context/ScoreboardContext";
import useCountdownTimer from "../../hooks/useCountdownTimer";
import ActionButton from "../buttons/ActionButton";
import TimeButton from "../buttons/TimeButton";
import CountdownTimer from "../CountdownTimer";

interface TimerPanelProps {
    duration: number;
};

const TimerPanel: React.FC<TimerPanelProps> = (props) => {
    const context: ScoreboardContextType = useContext(ScoreboardContext);
    const { countdown, addTime, isCounting, resetTimer, toggleCountdown } = useCountdownTimer(props.duration);

    useEffect(() => {
        if (context.isMatchResetting) {
            resetTimer();
        }
    }, [context.isMatchResetting]);

    return (
        <div className="panel">
            <div className="panel-control">
                <div>
                    <TimeButton time={1} onClick={() => addTime(1)} />
                    <TimeButton time={10} onClick={() => addTime(10)} />
                    <TimeButton time={60} onClick={() => addTime(60)} />
                    <ActionButton
                        text={isCounting ? "PAUSE TIMER" : "START TIMER"}
                        onClick={toggleCountdown}
                    />
                </div>
                <div>
                    <TimeButton time={-1} onClick={() => addTime(-1)} />
                    <TimeButton time={-10} onClick={() => addTime(-10)} />
                    <TimeButton time={-60} onClick={() => addTime(-60)} />
                    {!isCounting &&
                        <ActionButton
                            text={"RESET MATCH"}
                            onClick={() => context.setIsMatchResetting(true)}
                            // TODO: Show confirmation modal
                        />
                    }
                </div>
            </div>
            <CountdownTimer
                time={countdown}
                onClick={toggleCountdown}
            />
        </div>
    );
};

export default TimerPanel;