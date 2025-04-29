import "./Button.css";

interface ButtonProps {
  txtButton: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

function Button({ txtButton, disabled, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {txtButton}
    </button>
  );
}

export default Button;
