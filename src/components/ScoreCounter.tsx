import React from 'react';
import { Score } from '../models/Score';

export interface ScoreCounterProps {
    score: Score;
    className?: string;
    onPointsClick?: () => void;
    onAdvantagesClick?: () => void;
    onPenaltiesClick?: () => void;
};

const ScoreCounter: React.FC<ScoreCounterProps> = (props) => {
    return (
        <>
            <div
                className={props.className}
                onClick={props.onPointsClick}
            >
                {props.score.points}
            </div>
            <div className="panel-player-adv-pen">
                <div>
                    <div>ADVANTAGE</div>
                    <div
                        className="panel-player-adv-pen-score"
                        onClick={props.onAdvantagesClick}
                    >
                        {props.score.advantages}
                    </div>
                </div>
                <div>
                    <div>PENALTY</div>
                    <div
                        className="panel-player-adv-pen-score"
                        onClick={props.onPenaltiesClick}
                    >
                        {props.score.penalties}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScoreCounter;