import { useContext } from 'react';
import { ScoreboardContext, ScoreboardContextType } from '../context/ScoreboardContext';

const TimerControl = () => {
    const context: ScoreboardContextType = useContext(ScoreboardContext);

    return (
        <div className="">
            <table>
                <tbody>
                    <tr>
                        <button onClick={() => context.addTime(1)}>+1 SEC</button>
                        <button onClick={() => context.addTime(10)}>+10 SEC</button>
                        <button onClick={() => context.addTime(60)}>+60 SEC</button>
                    </tr>
                    <tr>
                        <button onClick={() => context.addTime(-1)}>-1 SEC</button>
                        <button onClick={() => context.addTime(-10)}>-10 SEC</button>
                        <button onClick={() => context.addTime(-60)}>-60 SEC</button>
                    </tr>
                    <tr>
                        <button onClick={() => context.toggleCountdown()}>{context.isCounting ? "PAUSE TIMER" : "START TIMER"}</button>
                        {!context.isCounting && <button onClick={() => context.resetMatch()}>{"RESET MATCH"}</button>}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TimerControl;