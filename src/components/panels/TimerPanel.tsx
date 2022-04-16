import { useContext, useEffect, useState } from "react";
import { ScoreboardContext, ScoreboardContextType } from "../../context/ScoreboardContext";
import useCountdownTimer from "../../hooks/useCountdownTimer";
import ActionButton from "../buttons/ActionButton";
import TimeButton from "../buttons/TimeButton";
import CountdownTimer from "../CountdownTimer";
import Modal from "../modals/Modal";

interface TimerPanelProps {
    duration: number;
};

const TimerPanel: React.FC<TimerPanelProps> = (props) => {
    const context: ScoreboardContextType = useContext(ScoreboardContext);
    const { countdown, addTime, isCounting, resetTimer, toggleCountdown } = useCountdownTimer(props.duration);
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    useEffect(() => {
        if (context.isMatchResetting) {
            resetTimer();
        }
    }, [context.isMatchResetting]);

    const closeConfirmationModal = () => {
        setIsModalOpened(false);
    };

    const submitConfirmationModal = () => {
        context.setIsMatchResetting(true);
        closeConfirmationModal();
    };

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
                {/*</div>*/}
                {/*<div>*/}
                    <TimeButton time={-1} onClick={() => addTime(-1)} />
                    <TimeButton time={-10} onClick={() => addTime(-10)} />
                    <TimeButton time={-60} onClick={() => addTime(-60)} />
                    {!isCounting &&
                        <ActionButton
                            text={"RESET MATCH"}
                            onClick={() => setIsModalOpened(true)}
                        />
                    }
                </div>
            </div>
            <CountdownTimer
                time={countdown}
                onClick={toggleCountdown}
            />
            <Modal
                isOpen={isModalOpened}
                onRequestClose={closeConfirmationModal}
            >
                <h1>ARE YOU SURE?</h1>
                <ActionButton
                    text={"RESET MATCH"}
                    onClick={submitConfirmationModal}
                />
                <ActionButton
                    text={"CANCEL"}
                    onClick={closeConfirmationModal}
                />
            </Modal>
        </div>
    );
};

export default TimerPanel;