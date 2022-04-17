import { useContext, useEffect } from "react";
import { ScoreboardContext, ScoreboardContextType } from "../../context/ScoreboardContext";
import useConfirmationModal from "../../hooks/useConfirmationModal";
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
    const { confirmationModal, showConfirmationModal } = useConfirmationModal({
        submitButtonOnClick: () => context.setIsMatchResetting(true),
        submitButtonText: "RESET MATCH"
    });

    useEffect(() => {
        if (context.isMatchResetting) {
            resetTimer();
        }
    }, [context.isMatchResetting]);

    return (
        <div className="panel-timer-grid">
            <div className="timer-controls-positive">
                <TimeButton className={"positive"} time={1} onClick={() => addTime(1)} />
                <TimeButton className={"positive"} time={10} onClick={() => addTime(10)} />
                <TimeButton className={"positive"} time={60} onClick={() => addTime(60)} />
                <ActionButton
                    text={isCounting ? "PAUSE TIMER" : "START TIMER"}
                    onClick={toggleCountdown}
                />
            </div>
            <br />
            <div className="timer-controls-negative">
                <TimeButton className={"negative"} time={-1} onClick={() => addTime(-1)} />
                <TimeButton className={"negative"} time={-10} onClick={() => addTime(-10)} />
                <TimeButton className={"negative"} time={-60} onClick={() => addTime(-60)} />
                {!isCounting &&
                    <ActionButton
                        text={"RESET MATCH"}
                        onClick={showConfirmationModal}
                    />
                }
            </div>
            <div className="timer-countdown">
                <CountdownTimer
                    time={countdown}
                    onClick={toggleCountdown}
                />
            </div>
            {confirmationModal}
        </div>
    );
};

export default TimerPanel;