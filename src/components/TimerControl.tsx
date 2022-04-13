import { useContext } from 'react';
import { ScoreboardContext, ScoreboardContextType } from '../context/ScoreboardContext';

const TimerControl = () => {
    const context: ScoreboardContextType = useContext(ScoreboardContext);

    return (
        <div>
            <button className={"button"} onClick={() => context.addTime(1)}>+1 SEC</button>
            <button className={"button"} onClick={() => context.addTime(10)}>+10 SEC</button>
            <button className={"button"} onClick={() => context.addTime(60)}>+60 SEC</button>
            <button className={"button"} onClick={() => context.addTime(-1)}>-1 SEC</button>
            <button className={"button"} onClick={() => context.addTime(-10)}>-10 SEC</button>
            <button className={"button"} onClick={() => context.addTime(-60)}>-60 SEC</button>
            <button className={"button"} onClick={context.toggleCountdown}>{context.isCounting ? "PAUSE TIMER" : "START TIMER"}</button>
            {!context.isCounting &&
                <button className={"button"} onClick={context.resetMatch}>{"RESET MATCH"}</button>
            }
        </div>
    );
};

export default TimerControl;