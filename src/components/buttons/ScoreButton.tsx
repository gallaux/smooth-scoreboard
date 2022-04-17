import { ScoreType } from '../../models/Score';
import ActionButton, { ActionButtonProps } from './ActionButton';

interface ScoreButtonProps extends ActionButtonProps {
    score: number;
    type: ScoreType;
};

const ScoreButton: React.FC<ScoreButtonProps> = (props) => {
    const getText = (scoreType: ScoreType): string => {
        let text: string = props.score > 0 ? "+" : "";
        if (scoreType === ScoreType.points) {
            text += props.score.toString();
        } else {
            text = props.score < 0 ? "-" : "";
            text += scoreType === ScoreType.advantages ? "A" : "P";
		}

        return text;
    };

    return (
        <ActionButton
            text={getText(props.type)}
            onClick={props.onClick}
            className={(props.score > 0 ? "positive " : "negative ") + (props.className ? props.className : "")}
        />
    );
};

export default ScoreButton;