export interface ActionButtonProps {
  text?: string;
  className?: string;
  onClick?: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({ text = "", className = "", onClick = () => { } }) => {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ActionButton;