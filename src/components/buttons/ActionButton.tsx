export interface ActionButtonProps {
    text?: string;
    color?: string;
    onClick?: () => void;
};

const defaultProps: ActionButtonProps = {
    text: "",
    color: "red",
    onClick: () => { }
};

const ActionButton: React.FC<ActionButtonProps> = (props) => {
    return (
        <button
            className={"button"}
            onClick={props.onClick}
            style={{ backgroundColor: props.color }}
        >
            {props.text}
        </button>
    );
};

ActionButton.defaultProps = defaultProps;
export default ActionButton;