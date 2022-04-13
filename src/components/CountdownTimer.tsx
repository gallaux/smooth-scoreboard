import React, { useContext } from 'react';
import { ScoreboardContext, ScoreboardContextType } from '../context/ScoreboardContext';
import { ControlPanelMenu } from '../models/ControlPanelMenu';
import { formatTimer } from '../utility/utility';

export type CountdownTimerProps = {
    duration: number;
};

const CountdownTimer: React.FC<CountdownTimerProps> = (props) => {
    const context: ScoreboardContextType = useContext(ScoreboardContext);
    const timeOverStyle: React.CSSProperties = context.countdown === 0 ? { color: "#f73d3d" } : {};

    return (
        <div className="panel-timer" onClick={() => context.toggleControlPanelMenu(ControlPanelMenu.Timer)} style={timeOverStyle}>
            {formatTimer(context.countdown)}
        </div>
    );
};

export default CountdownTimer;