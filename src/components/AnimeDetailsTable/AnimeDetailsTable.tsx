import { AnimeData } from "../../utils-types/anime-data";
import "./AnimeDetailsTable.css";

interface AnimeDetailsTableProps {
  anime: AnimeData;
}

export default function AnimeDetailsTable({ anime }: AnimeDetailsTableProps) {
  const details = [
    { label: "Áudio", value: anime.audio || "Não informado" },
    { label: "Distribuidora", value: anime.distributor || "Não informado" },
    {
      label: "Classificação de conteúdo",
      value: anime.content_classification || "Não informado",
    },
    {
      label: "Ano de lançamento",
      value: anime.release_date || "Não informado",
    },
  ];

  return (
    <div className="anime-details-table">
      {details.map((detail, i) => (
        <div key={i} className="anime-details-row">
          <div className="anime-row-content">
            <h5 className="label">{detail.label}</h5>
          </div>

          <div className="anime-row-content">
            <h5 className="detail-value">{detail.value}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}
