import "./ErrorMessage.css";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-message-container">
      <div className="error-message-content">
        <h2>Ocorreu um erro !</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
