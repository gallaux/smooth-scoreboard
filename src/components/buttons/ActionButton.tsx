export interface ActionButtonProps {
    id?: string;
    text?: string;
    className?: string;
    onClick?: () => void;
};

const defaultProps: ActionButtonProps = {
    id: "",
    text: "",
    className: "",
    onClick: () => { }
};

const ActionButton: React.FC<ActionButtonProps> = (props) => {
    return (
        <button
            id={props.id}
            className={props.className}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
};

ActionButton.defaultProps = defaultProps;
export default ActionButton;