import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./SynopsisSection.css";

interface SynopsisSectionProps {
  synopsis: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function SynopsisSection({
  synopsis,
  isExpanded,
  onToggle,
}: SynopsisSectionProps) {
  return (
    <>
      <div className={`anime-synopsis-wrapper ${isExpanded ? "expanded" : ""}`}>
        <p className="anime-synopsis-info">
          {synopsis || "Sinopse Indisponível"}
        </p>
        {!isExpanded && <div className="fade-overlay"></div>}
      </div>

      <div className="see-more-details">
        <button className="button-show-more" onClick={onToggle}>
          {isExpanded ? "Mostrar menos" : "Mostrar mais"}
          {isExpanded ? (
            <IoIosArrowUp size={20} />
          ) : (
            <IoIosArrowDown size={20} />
          )}
        </button>
      </div>
    </>
  );
}
