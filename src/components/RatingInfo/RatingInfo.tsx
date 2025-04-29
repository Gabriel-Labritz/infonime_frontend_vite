import { FaStar } from "react-icons/fa";

import "./RatingInfo.css";

interface RatingInfoProps {
  rating: number;
  onOpenModal: () => void;
}

export default function RatingInfo({ rating, onOpenModal }: RatingInfoProps) {
  return (
    <div className="rating-info">
      <h4>
        <FaStar size={30} color="#FFD300" /> {rating.toFixed(1) || "N/A"}
        <span className="rate-anime" onClick={onOpenModal}>
          avaliar
        </span>
      </h4>
    </div>
  );
}
