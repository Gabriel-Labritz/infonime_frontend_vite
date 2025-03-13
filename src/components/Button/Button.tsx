import './Button.css';

interface ButtonProps {
    txtButton: string;
    onClick?: () => void;
}

function Button({ txtButton, onClick}: ButtonProps) {
    return (
        <button onClick={onClick}>{txtButton}</button>
    );
}

export default Button;