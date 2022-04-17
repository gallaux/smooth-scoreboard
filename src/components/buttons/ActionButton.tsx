export interface ActionButtonProps {
    text?: string;
    className?: string;
    onClick?: () => void;
};

const defaultProps: ActionButtonProps = {
    text: "",
    className: "",
    onClick: () => { }
};

const ActionButton: React.FC<ActionButtonProps> = (props) => {
    return (
        <button
            className={props.className}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
};

ActionButton.defaultProps = defaultProps;
export default ActionButton;