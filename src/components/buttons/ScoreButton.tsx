import { useContext } from 'react';
import { ScoreboardContext, ScoreboardContextType } from '../../context/ScoreboardContext';
import { PlayerId } from '../../models/Player';
import ActionButton, { ActionButtonProps } from './ActionButton';

interface ScoreButtonProps extends ActionButtonProps, RequiredProps, OptionalProps { };

interface RequiredProps {
    playerId: PlayerId;
    //score: number;
    //scoreType: scoreType;
};

interface OptionalProps {
    points: number;
    advantages?: number;
    penalties?: number;
};

const defaultProps: OptionalProps = {
    points: 0,
    advantages: 0,
    penalties: 0
};

const ScoreButton: React.FC<ScoreButtonProps> = (props) => {
    const context: ScoreboardContextType = useContext(ScoreboardContext);

    return (
        <ActionButton
            text={(props.points >= 0 ? "+" : "-") + props.points.toString()}
            onClick={() =>
                context.addToPlayerScore(props.playerId, props.points, props.advantages, props.penalties)
            }
        />
    );
};

ScoreButton.defaultProps = defaultProps;
export default ScoreButton;