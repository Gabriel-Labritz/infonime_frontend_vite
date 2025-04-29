import { ReactNode, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import "./Input.css";

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  icon?: ReactNode;
  onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  type,
  name,
  placeholder,
  icon,
  value,
  onHandleChange,
}: InputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="input-container">
      <div className="icon-wrapper">{icon}</div>
      <input
        className="input-field"
        type={type === "password" && passwordVisible ? "text" : type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onHandleChange}
      />

      {type === "password" && (
        <button
          type="button"
          className="visible-password-button"
          onClick={handleToggle}
        >
          {passwordVisible ? <LuEyeClosed size={25} /> : <LuEye size={25} />}
        </button>
      )}
    </div>
  );
}

export default Input;
