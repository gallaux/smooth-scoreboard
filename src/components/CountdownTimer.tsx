import React from 'react';
import { toStringWithZeroPadding } from 'tunis-extensions';

export interface CountdownTimerProps {
    time: number;
    onClick?: () => void;
};

const formatTimer = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${toStringWithZeroPadding(minutes, 2)}:${toStringWithZeroPadding(seconds, 2)}`;
};

const CountdownTimer: React.FC<CountdownTimerProps> = (props) => {
    return (
        <div className={`panel-timer ${props.time === 0 ? "time-over" : ""}`} onClick={props.onClick}>
            {formatTimer(props.time)}
        </div>
    );
};

export default CountdownTimer;