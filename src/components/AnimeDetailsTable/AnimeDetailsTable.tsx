import { AnimeData } from "../../utils-types/anime-data";
import "./AnimeDetailsTable.css";

interface AnimeDetailsTableProps {
  animeData: AnimeData;
}

export default function AnimeDetailsTable({
  animeData,
}: AnimeDetailsTableProps) {
  const details = [
    { label: "Áudio", value: animeData.audio || "Não informado" },
    { label: "Distribuidora", value: animeData.distributor || "Não informado" },
    {
      label: "Classificação de conteúdo",
      value: animeData.content_classification || "Não informado",
    },
    {
      label: "Ano de lançamento",
      value: animeData.release_date || "Não informado",
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
