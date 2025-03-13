import { useState, useEffect } from "react";
import eventBus from "../../utils/bus";
import "./Message.css";

function Message() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(false);

  useEffect(() => {
    eventBus.addListener("flash", ({ message, type }) => {
      setIsVisible(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    });
  }, []);

  return (
    <>
      {isVisible && (
        <div className={`message-wrapper ${type ? "success" : "error"}`}>
          * {message}
        </div>
      )}
    </>
  );
}

export default Message;
