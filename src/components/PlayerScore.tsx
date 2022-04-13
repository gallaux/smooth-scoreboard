import { useContext, useState } from 'react';
import { ScoreboardContext, ScoreboardContextType } from '../context/ScoreboardContext';
import { PlayerId } from '../models/Player';

export type PlayerScoreProps = {
    id: PlayerId;
};

const PlayerScore: React.FC<PlayerScoreProps> = (props) => {
    const [points, setPoints] = useState(0);
    const [advantages, setAdvantages] = useState(0);
    const [penalties, setPenalties] = useState(0);
    const context: ScoreboardContextType = useContext(ScoreboardContext);

    return (
        <>
            <div className={`panel-player-points points-p${props.id.toString()}`} onClick={() => setPoints(pts => pts + 1)}>
                {points}
            </div>
            <div className="panel-player-adv-pen">
                <div>
                    <div>ADVANTAGE</div>
                    <div className="panel-player-adv-pen-score">{advantages}</div>
                </div>
                <div>
                    <div>PENALTY</div>
                    <div className="panel-player-adv-pen-score">{penalties}</div>
                </div>
            </div>
        </>
    );
};

export default PlayerScore;