import { useContext, useEffect } from "react";
import { ScoreboardContext, ScoreboardContextType } from "../../context/scoreboardContext";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import useCountdownTimer from "../../hooks/useCountdownTimer";
import ActionButton from "../buttons/actionButton";
import TimeButton from "../buttons/timeButton";
import CountdownTimer from "../countdownTimer";

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
  }, [context.isMatchResetting, resetTimer]);

  return (
    <div className="panel-timer-grid">
      <div className="timer-controls">
        <div className="timer-controls-positive">
          <TimeButton className={"positive"} time={1} onClick={() => addTime(1)} />
          <TimeButton className={"positive"} time={10} onClick={() => addTime(10)} />
          <TimeButton className={"positive"} time={60} onClick={() => addTime(60)} />
          <ActionButton
            text={isCounting ? "PAUSE TIMER" : "START TIMER"}
            onClick={toggleCountdown}
          />
        </div>
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