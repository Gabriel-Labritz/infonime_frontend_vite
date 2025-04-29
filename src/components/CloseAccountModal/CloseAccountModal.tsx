import { useCloseUserAccount } from "../../hooks/useCloseUserAccount";
import Loading from "../Loading/Loading";

import "./CloseAccountModal.css";

interface CloseAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CloseAccountModal({
  isOpen,
  onClose,
}: CloseAccountModalProps) {
  const { closeUserAccount, isLoading } = useCloseUserAccount();

  const handleCloseAccount = async () => {
    await closeUserAccount();
  };

  return (
    <>
      {isLoading && <Loading />}
      {isOpen && (
        <div className="close-account-modal-overlay">
          <div className="close-account-modal-content">
            <p>Deseja mesmo encerrar sua conta?</p>
            <div className="close-account-modal-buttons">
              <button onClick={() => onClose()}>Cancelar</button>
              <button onClick={handleCloseAccount}>Aceitar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
