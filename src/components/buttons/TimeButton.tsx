import ActionButton, { ActionButtonProps } from './ActionButton';

interface TimerButtonProps extends ActionButtonProps {
    time: number;
};

const TimerButton: React.FC<TimerButtonProps> = (props) => {
    return (
        <ActionButton
            text={`${props.time > 0 ? "+" : ""}${props.time} SEC`}
            onClick={props.onClick}
            className={props.time > 0 ? "positive" : "negative"}
        />
    );
};

export default TimerButton;