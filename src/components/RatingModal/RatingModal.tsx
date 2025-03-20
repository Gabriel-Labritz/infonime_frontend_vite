import { useEffect, useState } from "react";
import { useRateAnime } from "../../hooks/useRateAnime";

import "./RatingModal.css";

interface RatingModalProps {
  animeId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function RatingModal({
  animeId,
  isOpen,
  onClose,
}: RatingModalProps) {
  const { rateAnime, successMessage, setSuccessMessage, error } =
    useRateAnime();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    if (!isOpen) {
      setSelectedRating(null);
      setSuccessMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (selectedRating === null) return;
    await rateAnime(animeId, selectedRating);

    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="rating-options">
          {ratings.map((num) => (
            <button
              key={num}
              className={`button-ratings ${
                selectedRating === num ? "selected" : ""
              }`}
              onClick={() => setSelectedRating(num)}
            >
              {num}
            </button>
          ))}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <div className="modal-buttons">
          <button onClick={onClose}>Voltar</button>
          <button onClick={handleSubmit} disabled={selectedRating === null}>
            Avaliar
          </button>
        </div>
      </div>
    </div>
  );
}
