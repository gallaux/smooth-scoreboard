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
            <div className="score-counter-adv-pen">
                <div className="adv-pen">
                    <div className={props.score.advantages > 0 ? "positive" : ""}>
                        <div>ADVANTAGE</div>
                        <div
                            className="adv-pen-score"
                            onClick={props.onAdvantagesClick}
                        >
                            {props.score.advantages}
                        </div>
                    </div>
                    <div className={props.score.penalties > 0 ? "negative" : ""}>
                        <div>PENALTY</div>
                        <div
                            className="adv-pen-score"
                            onClick={props.onPenaltiesClick}
                        >
                            {props.score.penalties}
                        </div>
                    </div>
                </div>
            </div>
            <div className="score-counter-points">
                <div className={props.className} onClick={props.onPointsClick}>
                    {props.score.points}
                </div>
            </div>
        </>
    );
};

export default ScoreCounter;