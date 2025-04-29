import { useState, useEffect } from "react";
import { useRating } from "../../hooks/useRating";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import "./AnimeRateModal.css";

interface AnimeRateModalProps {
  animeId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AnimeRateModal({
  animeId,
  isOpen,
  onClose,
}: AnimeRateModalProps) {
  const { rateAnime, successMessage, setSuccessMessage, isLoading, error } =
    useRating();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    setSelectedRating(null);
    setSuccessMessage(null);
  }, [isOpen]);

  const handleRateSubmit = async () => {
    if (selectedRating === null) return;
    await rateAnime(animeId, selectedRating);

    const timeOut = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timeOut);
  };

  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {isOpen && (
        <div className="modal-container-overlay">
          <div className="modal-content">
            <div className="ratings-options">
              {ratings.map((num) => (
                <button
                  key={num}
                  className={`btn-ratings-options ${
                    selectedRating === num ? "selected" : ""
                  }`}
                  onClick={() => setSelectedRating(num)}
                >
                  {num}
                </button>
              ))}
            </div>

            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}

            <div className="modal-buttons">
              <button onClick={() => onClose()}>Voltar</button>
              <button
                onClick={handleRateSubmit}
                disabled={selectedRating === null}
              >
                Avaliar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
